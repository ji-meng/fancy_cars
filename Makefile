SRC_DIR = app
ARTIFACT_DIR = artifacts
BUILD_DIR = ${ARTIFACT_DIR}/build
INTERNALS_DIR = internals
E2E_DIR = e2es

# so we can use `eslint` without ./node_modules/.bin/eslint
SHELL := /bin/bash
export PATH := $(shell yarn bin):$(PATH)

# this allows us to test CI tasks locally
# eg. CI=1 make test => outputs a junit xml file
# make test => outputs onto stdout
ifdef CI
    ESLINT_EXTRA_ARGS=--format junit --output-file $(ARTIFACT_DIR)/test_results/eslint/eslint.junit.xml
    STYLELINT_EXTRA_ARGS=--custom-formatter node_modules/stylelint-junit-formatter
    STYLELINT_REDIRECT=> $(ARTIFACT_DIR)/test_results/stylelint/stylelint.junit.xml
    JEST_ENV_VARIABLES=JEST_SUITE_NAME="FE App Boilerplate Tests" JEST_JUNIT_OUTPUT=$(ARTIFACT_DIR)/test_results/jest/jest.junit.xml
    JEST_E2E_ENV_VARIABLES=JEST_SUITE_NAME="FE App Boilerplate E2E Tests" JEST_JUNIT_OUTPUT=$(ARTIFACT_DIR)/test_results/e2e/e2e.junit.xml
    JEST_EXTRA_ARGS=--testResultsProcessor ./node_modules/jest-junit
else
    ESLINT_EXTRA_ARGS=
    STYLELINT_EXTRA_ARGS=
    STYLELINT_REDIRECT=
    JEST_ENV_VARIABLES=
    JEST_E2E_ENV_VARIABLES=
    JEST_EXTRA_ARGS=
endif

JEST_ARGS=--config '${INTERNALS_DIR}/testing/jestConfig.json' ${JEST_EXTRA_ARGS}
JEST_E2E_ARGS=--config '${INTERNALS_DIR}/testing/e2e/jestE2EConfig.json' ${JEST_EXTRA_ARGS}
ESLINT_ARGS=--max-warnings 0 ${ESLINT_EXTRA_ARGS}
STYLELINT_ARGS=${STYLELINT_EXTRA_ARGS} ${STYLELINT_REDIRECT}

# same thing as above
# eg. PROD=1 make build => uses prod webpack config
# make build
ifdef PROD
    NODE_ENVIRONMENT=NODE_ENV=production
    WEBPACK_ARGS=--config internals/webpack/webpack.prod.babel.js -p --hide-modules --display-optimization-bailout
else
    NODE_ENVIRONMENT=NODE_ENV=development
    WEBPACK_ARGS=--config internals/webpack/webpack.dev.babel.js --hide-modules
endif

# .PHONY: prevents files named 'clean' from stopping the 'clean' task from running
# https://www.gnu.org/software/make/manual/html_node/Phony-Targets.html
.PHONY: help
help:
	@echo "--------------------- Useful Commands for Development ----------------------"
	@echo "make help                            - show this help message"
	@echo "make install                         - install dependencies, blows up node_modules"
	@echo "make start                           - builds and runs the project, autoreloading on file changes"
	@echo "make start-tunnel                    - runs the project and provides a globally accessible proxy url for testing on other devices"
	@echo "make lint                            - runs eslint and stylelint"
	@echo "make eslint                          - runs eslint"
	@echo "make stylelint                       - runs stylelint"
	@echo "make lint-fix                        - attempts to autofix linting errors"
	@echo "make test                            - runs the full test suite with jest"
	@echo "make test-watch                      - re-runs tests on file changes - VERY useful"
	@echo "make test-snapshots                  - updates the jest snapshots"
	@echo "make test-coverage                   - creates a coverage report and opens it in your browser"
	@echo "make test-e2e                        - runs the E2E test suite against localhost (make sure your server is running)"
	@echo "make analyze                         - analyzes your webpack bundle"
	@echo ""
	@echo "------------------ Other Commands (for CI / Production) --------------------"
	@echo "PROD=1 make build                    - build the project distribution"
	@echo "make install-no-clean                - installs without cleaning dependencies, for improved caching on CI"
	@echo "CI=1 make lint                       - runs eslint, stylelint and generates a junit file containing any errors"
	@echo "CI=1 make test                       - runs the jest test suite and outputs coverage and junit information"
	@echo "make install-deployment-deps         - installs dependencies needed for the deployment scripts"
	@echo "make deploy-staging                  - deploys the staging environment"
	@echo "make deploy-production               - deploys the production environment"

# ---- Installing, Building and Running ----

.PHONY: install
install: check-versions clean node_modules

.PHONY: build
build: check-versions node_modules
	@rm -rf ${BUILD_DIR}
	${NODE_ENVIRONMENT} webpack ${WEBPACK_ARGS}

.PHONY: start
start: check-versions node_modules
	@${NODE_ENVIRONMENT} node server

.PHONY: start-tunnel
start-tunnel: check-versions node_modules
	@${NODE_ENVIRONMENT} ENABLE_TUNNEL=true node server

# -------------- Linting --------------

.PHONY: lint
lint: eslint stylelint

.PHONY: eslint
eslint: check-versions node_modules ${ARTIFACT_DIR}
	eslint ${ESLINT_ARGS} .

.PHONY: stylelint
stylelint: check-versions node_modules ${ARTIFACT_DIR}
	stylelint '${SRC_DIR}/**/*.js' ${STYLELINT_ARGS}

.PHONY: lint-fix
lint-fix: check-versions node_modules
	eslint --fix .

# -------------- Testing --------------

.PHONY: test
test: check-versions node_modules ${ARTIFACT_DIR}
	${JEST_ENV_VARIABLES} NODE_ENV=test jest ${JEST_ARGS}

.PHONY: test-watch
test-watch: check-versions node_modules ${ARTIFACT_DIR}
	NODE_ENV=test jest ${JEST_ARGS} --watch

.PHONY: test-coverage
test-coverage: check-versions node_modules ${ARTIFACT_DIR}
	NODE_ENV=test jest ${JEST_ARGS} --coverage
	open ${ARTIFACT_DIR}/coverage/lcov-report/index.html

.PHONY: test-snapshots
test-snapshots: check-versions node_modules ${ARTIFACT_DIR}
	NODE_ENV=test jest ${JEST_ARGS} -u

.PHONY: test-e2e
test-e2e: check-versions node_modules ${ARTIFACT_DIR}
	${JEST_E2E_ENV_VARIABLES} NODE_ENV=test jest ${JEST_E2E_ARGS}

# TODO ------- Remove these after Jest upgrades and fixes https://github.com/facebook/jest/issues/5332 --------
.PHONY: test-ci
test-ci: check-versions node_modules ${ARTIFACT_DIR}
	${JEST_ENV_VARIABLES} NODE_ENV=test ./internals/scripts/run-tests-ci.sh ${JEST_ARGS}

.PHONY: test-e2e-ci
test-e2e-ci: check-versions node_modules ${ARTIFACT_DIR}
	${JEST_E2E_ENV_VARIABLES} NODE_ENV=test ./internals/scripts/run-tests-ci.sh ${JEST_E2E_ARGS}
# TODO: -------------------------------------------------------------------------------------------------------

# ---------------- Misc -----------------

.PHONY: analyze
analyze: check-versions node_modules
	node ./internals/scripts/analyze.js

# --------------- CI Scripts -----------------

.PHONY: install-no-clean
install-no-clean: check-versions node_modules

.PHONY: install-deployment-deps
install-deployment-deps:
	./internals/deployment/install-deployment-deps.sh

.PHONY: deploy-staging
deploy-staging:
	./internals/deployment/deploy.sh

.PHONY: deploy-production
deploy-production:
	PRODUCTION=true ./internals/deployment/deploy.sh

# ----------------- Helpers ------------------

.PHONY: check-versions
check-versions:
	@./internals/scripts/check-versions.sh

.PHONY: clean
clean:
	@rm -rf ${ARTIFACT_DIR}
	@rm -rf node_modules

${ARTIFACT_DIR}:
	@mkdir -p ${ARTIFACT_DIR}/build
	@mkdir -p ${ARTIFACT_DIR}/coverage/lcov-report
	@mkdir -p ${ARTIFACT_DIR}/test_results/eslint
	@mkdir -p ${ARTIFACT_DIR}/test_results/stylelint

node_modules:
	yarn install
	@touch node_modules

.PHONY: node_modules_version
node_modules_version: package.json yarn.lock
	@git ls-tree HEAD $^ | shasum | awk '{print $$1;}'

.PHONY: dockerfile_version
dockerfile_version: Dockerfile
	@git ls-tree HEAD $^ | shasum | awk '{print $$1;}'

.PHONY: docker_image_exists
docker_image_exists:
	@aws ecr describe-images --repository-name ${REPOSITORY_NAME} --image-ids imageTag=${IMAGE_TAG} 1>&2 2> /dev/null; echo $$?
