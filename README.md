## Installation
```npm i djs-tickets```

## Delcaration
```js
const ts = require('djs-tickets')
```

## Functions
### Starting up the system
```js
// Initiating The System (Mandatory)
ts.start(client/*An Object*/)
```
### Setting-up up the system in a specific channel
```js
ts.setup(Message/Interaction/*An Object*/,ChannelID/*A String*/)
// Message object is the object provided in client.on('messageCreate') event, if you want to use with slash command, you can provide Interaction which is provided in client.on('InteractionCreate') event in Djs v13

// ChannelID is the channelID where you want bot to send the message to which people can react to and open a ticket, more customisation soon...
 ```
### Closing
```js
ts.close(message /*An Object*/,transcript /*A boolean*/)
// Message object is the object provided in client.on('messageCreate') event, if you want to use with slash command, you can provide Interaction which is provided in client.on('InteractionCreate') event in Djs v13

// If you want bot to send transcript, set second parameter as true. 

// BOT WILL AUTOMATICALLY CHECK IF THE CHANNEL IS A TICKET OR NOT, AND, CLOSE ONLY IF IT IS ONE
```
## Support
Feel free to ask for support in [Discord Server](https://u.pgamerx.com/discord)

