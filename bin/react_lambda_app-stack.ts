#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ReactLambdaAppStack } from '../lib/react_lambda_app-stack';

const app = new cdk.App();
new ReactLambdaAppStack(app, 'ReactLambdaAppStack');