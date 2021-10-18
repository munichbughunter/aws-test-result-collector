const AWS = require("aws-sdk");
const stepfunctions = new AWS.StepFunctions();
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    
    const {state, stateMachine} = JSON.parse(event.body);
   
    var params = {
        maxResults: 1, 
        stateMachineArn: stateMachine, 
        statusFilter: state
    };

    const resultData = await stepfunctions.listExecutions(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else return data; // successful response
    }).promise();

    response = {
        statusCode: 200,
        body: JSON.stringify(resultData),
    }
    return response
};
