# Deploy AWS Lambda functions using Serverless



1. Setup Serverless 
    - https://www.serverless.com/framework/docs/providers/aws/guide/installation/

2. `npm install`
3. `sls deploy`

After the steps above, serverless will output a websocket endpoint using AWS Gateway API services (Websocket). Check that DynamoDB Tables are created and you are able to connect to the websocket. 
