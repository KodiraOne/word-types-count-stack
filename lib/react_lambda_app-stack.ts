import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as s3 from '@aws-cdk/aws-s3';
import * as path from "path";

export class ReactLambdaAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create Lambda function
    const lambdaFunction = new lambda.Function(this, 'countWordTypesInText', {
      functionName: 'countWordTypesInText',
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(
        path.join(__dirname, "lambda", 'countWordTypesInText')
      ),
    });

    // Add lambda function url
    const fnUrl = lambdaFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    // create S3 bucket for hosting react app as static website
    const reactAppBucket = new s3.Bucket(this, 'count-word-types', {
      bucketName: app.node.tryGetContext('reactAppBucketName'),
      websiteIndexDocument: 'index.html',
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
      accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
      publicReadAccess: true,
    });

    // Output bucket name
    new cdk.CfnOutput(this, 'ReactAppBucket', {
      value: reactAppBucket.bucketName,
      exportName: 'ReactAppBucket'
    });
    
    // Output lambda url
    new cdk.CfnOutput(this, "LambdaServiceUrl", {
      value: fnUrl.url,
      exportName: 'LambdaServiceUrl'
    });
  }
}

// Define your AWS CDK app
const app = new cdk.App();

new ReactLambdaAppStack(app, 'ReactLambdaAppStack');