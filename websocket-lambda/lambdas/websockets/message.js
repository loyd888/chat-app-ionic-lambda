const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');
const WebSocket = require('../common/websocketMessage');

const tableName = process.env.tableName; //pass through serverless env var
const chatTable = process.env.chatTableName;

exports.handler = async event =>{
    console.log('event', event)

    const {connectionId: connectionID} = event.requestContext;

    const body = JSON.parse(event.body);

    try{
        const record = await Dynamo.get(connectionID, tableName);
        const {messages, domainName, stage, room} = record;

        messages.push(body.message);
        room = body.room;
        const data = {
            ...record, 
            messages, 
            room
        };

        await Dynamo.write(data, tableName)

        //process room messages

        const roomRecord = await Dynamo.get(room, chatTable);
        const {messages, domainName, stage, connectionIDList} = record;

        messages.push(body.message);

        //TODO- normally a separate function to register user to join a room
        connectionIDList.indexOf(connectionID) === -1 ? array.push(connectionID) : console.log("This user already in room");

        const roomData = {
            ...roomRecord, 
            messages, 
            connectionIDList,
            room
        };

        await Dynamo.write(roomData, chatTable)

        await WebSocket.sendToMany({domainName, stage, connectionIDList, message: body.message,})

        return Responses._200({message:'got a message'})
    }catch(error){
        return Responses._400({messges: 'message could not be received'})
    }
}