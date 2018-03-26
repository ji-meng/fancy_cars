#!/bin/bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
source "$DIR/../scripts/helpers/shell-helpers.sh"

if [ "$PRODUCTION" == "true" ]; then
    source "$DIR/production-config.sh"
else
    source "$DIR/staging-config.sh"
fi

cloudformation_response=$(aws cloudformation deploy \
    --template-file $DIR/infrastructure.yml \
    --stack-name $STACK_NAME \
    --parameter-overrides \
        AppName=$APP_NAME \
        BucketName=$BUCKET_NAME \
        CertificateArn=$CERTIFICATE_ARN \
        DomainName=$DOMAIN_NAME \
        HostedZoneName=$HOSTED_ZONE_NAME\
        2>&1)

returnCode=$?
NO_UPDATE_REQUIRED="Submit different information to create a change set"

if [[ $returnCode -ne 0 ]] && [[ $cloudformation_response != *$NO_UPDATE_REQUIRED* ]]; then
    echo $cloudformation_response
    echo -e "${RED}CloudFormation Deployment Failed${NC}"
    exit 1
fi

run "aws s3 sync artifacts/build/ s3://${BUCKET_NAME}/"
run "aws s3 cp artifacts/build/index.html s3://${BUCKET_NAME}/index.html --cache-control max-age=300"

if [ "$SET_NO_ROBOTS" == "true" ]; then
    run "aws s3 cp internals/deployment/disallow-all-robots.txt s3://${BUCKET_NAME}/robots.txt"
fi
