const AWS = require('aws-sdk');

const create = (domainName, stage)=>{
    const endpoint = `${domainName}/${stage}`;
    return new AWS.ApiGatewayManagementApi({
        endpoint,
        apiVersion: '2018-11-29'
        
    })
}

const send = ({domainName, stage, connectionID, message})=>{
    const ws = create(domainName, stage);

    const postParams = {
        Data: message, 
        ConnectionId: connectionID, 

    };

    return ws.postToConnection(postParams).promise();
};

const sendToMany = ({domainName, stage, connectionIDList, message})=>{
    const ws = create(domainName, stage);

    const promises = connectionIDList.map(c => ws.postToConnection({
        Data: message, 
        ConnectionId: c.connectionID
    }).promise())
    

    return Promise.all(promises);
};


module.exports = {
    send, 
    sendToMany
}