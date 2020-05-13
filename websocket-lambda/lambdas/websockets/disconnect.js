const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName; //pass through serverless env var


exports.handler = async event =>{
    console.log('event', event)

    const {connectionId: connectionID} = event.requestContext;

    await Dynamo.delete(connectionID, tableName)

    return Responses._200({message:'disconnected'})
}