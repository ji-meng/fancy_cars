#!groovy

ci_artifacts_bucket = 'fe-ci-artifacts'
node_modules_version = null
build_node_modules = false
docker_registry = 'https://306501597120.dkr.ecr.us-east-1.amazonaws.com'
docker_image_name = 'fe-build-images'
docker_image_tagged = null

// ----------------------------- Scripted Pipeline -----------------------------
/*
 * Runs steps for setting up the main declarative pipeline
 */
node('fastlane') {
    stage('Build Docker Image') {
        /*
         * Build the Docker image used in the steps for the main declarative pipeline
         */
        checkout scm
        buildDockerImage()
    }
}

// ----------------------------- Declarative Pipeline -----------------------------
/*
 * Runs the main steps in the build
 */
pipeline {
    agent none

    options {
        ansiColor('xterm')
        timeout(time: 60, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '30', artifactNumToKeepStr: '30'))
    }

    environment {
        ARTIFACT_DIR = 'artifacts'
        BUILD_DIR = 'build'
        SRC_DIR = 'app'
        CI=1
        PROD=1
        // SENTRY_API_KEY=credentials('FE_APP_BOILERPLATE_SENTRY_API_KEY')
    }

    stages {
        stage('Restore Cached Dependencies') {
            agent {
                docker {
                    image docker_image_tagged
                    label 'bulk'
                    registryUrl docker_registry
                }
            }

            steps {
                script {
                    node_modules_version = sh(script: "make -s node_modules_version", returnStdout: true).trim()
                    build_node_modules = sh(script: "aws s3 ls s3://${ci_artifacts_bucket}/cached_node_modules/${node_modules_version}.tar.gz", returnStatus: true) != 0
                }
            }
        }

        stage('Install Dependencies') {
            when {
                expression { build_node_modules }
            }

            agent {
                docker {
                    image docker_image_tagged
                    label 'bulk'
                    registryUrl docker_registry
                }
            }

            steps {
                sh 'make node_modules'
            }

            post {
                success {
                    // Cache dependencies for later builds
                    sh "tar cz node_modules | aws s3 cp - s3://${ci_artifacts_bucket}/cached_node_modules/${node_modules_version}.tar.gz"
                }
            }
        }

        stage('Test & Build') {
            parallel {
                stage('Run Tests') {
                    agent {
                        docker {
                            image docker_image_tagged
                            label 'bulk'
                            registryUrl docker_registry
                        }
                    }

                    steps {
                        script { prepareWorkspace() }
                        tryCatchMarkUnstable('Run Tests') {
                            sh 'make test-ci'
                        }
                    }

                    post {
                        always {
                            junit "${ARTIFACT_DIR}/test_results/**/*.junit.xml"
                            archive "${ARTIFACT_DIR}/test_results/**/*.junit.xml"
                        }
                    }
                }

                stage('Lint JS') {
                    agent {
                        docker {
                            image docker_image_tagged
                            label 'bulk'
                            registryUrl docker_registry
                        }
                    }

                    steps {
                        script { prepareWorkspace() }
                        tryCatchMarkUnstable('Lint JS') {
                            sh 'make eslint'
                        }
                    }

                    post {
                        always {
                            junit allowEmptyResults: true, testResults: "${ARTIFACT_DIR}/test_results/**/*.junit.xml"
                            archive "${ARTIFACT_DIR}/test_results/**/*.junit.xml"
                        }
                    }
                }

                stage('Lint CSS') {
                    agent {
                        docker {
                            image docker_image_tagged
                            label 'bulk'
                            registryUrl docker_registry
                        }
                    }

                    steps {
                        script { prepareWorkspace() }
                        tryCatchMarkUnstable('Lint CSS') {
                            sh 'make stylelint'
                        }
                    }

                    post {
                        always {
                            junit "${ARTIFACT_DIR}/test_results/**/*.junit.xml"
                            archive "${ARTIFACT_DIR}/test_results/**/*.junit.xml"
                        }
                    }
                }

                stage('Build & Run E2Es locally') {
                    agent {
                        docker {
                            image docker_image_tagged
                            label 'bulk'
                            registryUrl docker_registry
                        }
                    }

                    steps {
                        script { prepareWorkspace() }
                        sh 'make build'
                        stash name: 'build_artifacts', includes: 'artifacts/build/**/*'

                        sh 'make start &'
                        sh 'sleep 5'
                        tryCatchMarkUnstable('Run E2Es') {
                            sh 'E2E_TARGET=local make test-e2e-ci'
                        }
                    }

                    post {
                        always {
                            junit "${ARTIFACT_DIR}/test_results/**/*.junit.xml"
                            archive "${ARTIFACT_DIR}/test_results/**/*.junit.xml"
                            archive "${ARTIFACT_DIR}/build/**/*"
                        }
                    }
                }
            }
        }

        /* stage('Deploy Staging') {
            when {
                branch 'master'
            }

            agent {
                docker {
                    image docker_image_tagged
                    label 'bulk'
                    registryUrl docker_registry
                }
            }

            steps {
                milestone 1
                lock('fe-marketplace-staging-deployment') {
                    script { prepareWorkspace() }
                    unstash 'build_artifacts'
                    withAWS(role: 'Jenkins', roleAccount: '008963853103') {
                        sh 'make deploy-staging'
                    }
                    sh 'E2E_TARGET=staging make test-e2e-ci'
                }
            }
        } */

        /* stage('Deploy Production') {
            when {
                branch 'master'
            }

            agent {
                docker {
                    image docker_image_tagged
                    label 'bulk'
                    registryUrl docker_registry
                }
            }

            steps {
                milestone 2
                lock('fe-marketplace-production-deployment') {
                    script { prepareWorkspace() }
                    sh 'BUILD_FOR_PRODUCTION=true make build'
                    sh 'make deploy-production'
                    sh 'E2E_TARGET=production make test-e2e-ci'
                }
            }
        } */
    }

    post {
        always {
            script { notifySlack() }
        }
    }
}

// ----------------------------- Helper Functions -----------------------------

/*
 * Build new Docker image if we need to
 */
def buildDockerImage() {
    dockerfile_version = sh(script: "make -s dockerfile_version", returnStdout: true).trim()
    docker_image_tagged = "${docker_image_name}:${dockerfile_version}"
    docker.withRegistry(docker_registry) {
        docker_image_exists = sh(script: "REPOSITORY_NAME=${docker_image_name} IMAGE_TAG=${dockerfile_version} make -s docker_image_exists", returnStdout: true).trim()
        // 0 means the image exists
        if (docker_image_exists != "0") {
            docker_image = docker.build(docker_image_name)
            docker_image.push(dockerfile_version)
        }
    }
}

/*
 * Load dependencies from s3 bucket cache
 */
def prepareWorkspace() {
    sh 'rm -rf node_modules && rm -rf ${ARTIFACT_DIR}'
    sh "aws s3 cp s3://${ci_artifacts_bucket}/cached_node_modules/${node_modules_version}.tar.gz - | tar xz"
}

/*
 * Use "UNSTABLE" to distinguish test failures from build failures.
 */
def tryCatchMarkUnstable(job_label, Closure task) {
    try {
        task()
    } catch (err) {
        echo "${job_label} Failed. Caught: ${err}"
        manager.buildUnstable()
        manager.addShortText(job_label, 'black', 'yellow', '1px', 'black')
    }
}

/*
 * Notify Slack of unstable and failed builds on the master branch
 */
def notifySlack() {
    if (env.BRANCH_NAME == "master") {
        if (currentBuild.result == "UNSTABLE") {
            slackSend(
                channel: 'fe-app-boilerplate',
                message: "@here fe-app-boilerplate build has test failures, please check the <${env.BUILD_URL}|build result> or <${env.BUILD_URL}consoleFull|console output>",
                color: 'warning',
            )
        }
        if (currentBuild.result == "FAILURE") {
            slackSend(
                channel: 'fe-app-boilerplate',
                message: "@here fe-app-boilerplate build errored out, please check the <${env.BUILD_URL}|build result> or <${env.BUILD_URL}consoleFull|console output>",
                color: 'danger',
            )
        }
        /* if (currentBuild.currentResult == "SUCCESS") {
            slackSend(
                channel: 'fe-app-boilerplate,deployments',
                message: "fe-app-boilerplate deployed successfully. View the <${env.BUILD_URL}|build result>",
                color: 'good',
            )
        } */
    }
}
