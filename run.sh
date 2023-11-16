#!/bin/bash

# Define your AWS region
AWS_REGION="eu-west-1"

# Build the Formation templates
npm run build

# Deploy CloudFormation stack using AWS CLI and pass ReactAppBucketName and LambdaFunctionName parameters
cdk deploy --region $AWS_REGION --outputs-file send-receive-text-app/src/vars.json

S3_BUCKET_NAME=$(grep -o '"ReactAppBucket": "[^"]*' send-receive-text-app/src/vars.json | grep -o '[^"]*$')

# Build the React app
cd send-receive-text-app
npm run build

# Sync the build directory to the S3 bucket
aws s3 sync build/ s3://$S3_BUCKET_NAME --delete --region $AWS_REGION

# Output the website URL
echo "React app deployed to: https://$S3_BUCKET_NAME.s3.amazonaws.com/index.html"