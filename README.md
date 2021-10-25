## Installation
```txt
npm i djs-tickets
```

## Delcaration
```js
const ts = require('djs-tickets')
```

## Initialising (Mandatory)
```js
ts.start(client)
```

## Setup Ticket
```js
ts.setup(Message,ChannelID)
```
- Message: (Object) is the object provided in client.on('messageCreate') event, if you want to use with slash command, you can provide Interaction which is provided in client.on('InteractionCreate') event in Djs v13.     
- ChannelID: (String) is the channelID where you want bot to send the message to which people can react to and open a ticket, more customisation soon... 

## Closing Ticket
```js
ts.close(Message,Transcript)
```
- Message: (Object) is the object provided in client.on('messageCreate') event, if you want to use with slash command, you can provide Interaction which is provided in client.on('InteractionCreate') event in Djs v13.    
- Transcript: (Boolean) If you want bot to send transcript, set this parameter as true.      

⚠️ This function will only work in a ticket channel, you don't need to add a manual check yourself :)
## Support
Feel free to ask for support in [Discord Server](https://u.pgamerx.com/discord)
