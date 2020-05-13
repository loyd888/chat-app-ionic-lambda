const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName; //pass through serverless env var
const chatTable = process.env.chatTableName;;

exports.handler = async event =>{
    console.log('event', event)

    const {connectionId: connectionID, domainName, stage} = event.requestContext;

    const data = {
        ID: connectionID, 
        date: Date.now(), 
        messages: [], 
        domainName, 
        stage,
    }

    //save individual users
    await Dynamo.write(data, tableName)


    //create a room for each user connected 
    try {
        const roomData = {
            ID: connectionID,
            date: Date.now(), 
            messages: [], 
            connectionIDList:[],
            domainName, 
            stage,
        }
    
        await Dynamo.write(roomData, chatTable)
    } catch (error) {
        console.log('room for this user already created.')
    }
    

    return Responses._200({message:'connected'})
}

