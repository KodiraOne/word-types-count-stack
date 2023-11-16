# How to get started  
## Set AWS IAM credentials in environment variables for the account where you will deploy app.  
export AWS_ACCESS_KEY_ID={id}  
export AWS_SECRET_ACCESS_KEY={secret}  
> Please make sure this user has all necessery rights  
## Bootstrap AWS CDK  
cdk bootstrap aws://ACCOUNT-NUMBER/REGION  
## Run the script to deploy the app  
./run.sh