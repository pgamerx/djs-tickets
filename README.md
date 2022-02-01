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
ts.start(Client,Embed(optional))     
```
- **Client**: *(Object)* is the Client object of the bot, which is required for the ticket system to work.
- Embed: *(DiscordJS-Embed)* is the embed which you want to be sent in the ticket channel when ticket is opened.
## Setup Ticket 
```js
ts.setup(Message,ChannelID,Embed(optional))
```
- **Message**: *(Object)* is the object provided in client.on('messageCreate') event, if you want to use with slash command, you can provide Interaction which is provided in client.on('InteractionCreate') event in Djs v13.     
- **ChannelID**: *(String)* is the channelID where you want bot to send the message to which people can react to and open a ticket
- Embed: *(DiscordJS-Embed)* is the embed which you want people to react to in order to open the ticket.

## Closing Ticket
```js
ts.close(Message,Transcript)
```
- **Message**: *(Object)* is the object provided in client.on('messageCreate') event, if you want to use with slash command, you can provide Interaction which is provided in client.on('InteractionCreate') event in Djs v13.    
- **Transcript**: *(Boolean)* If you want bot to send transcript, set this parameter as true.      

⚠️ This function will only work in a ticket channel, you don't need to add a manual check yourself :)

# Generated Documentation 
### Table of Contents

*   [start][3]
    *   [Parameters][4]
*   [setup][5]
    *   [Parameters][6]
*   [close][7]
    *   [Parameters][8]

## start

### Parameters

*   `client`  The Client object of the bot. (Discord.Client) - Required
*   `MessageEmbed`  The MessageEmbed object to be used for the ticket. (Discord.MessageEmbed) - Optional

## setup

### Parameters

*   `MessageObject`  The Message Object of the message to be used for the ticket. (Discord.Message) - Required
*   `ChannelID`  The ID of the channel to be used for the ticket. (String) - Required
*   `Embed`  The MessageEmbed object to be used for the ticket. (Discord.MessageEmbed) - Optional

## close

### Parameters

*   `message`  The Message Object of the message to be used for the ticket. (Discord.Message) - Required
*   `transcript`  The Boolean value to be used for the transcript. (Boolean) - Required

[3]: #start

[4]: #parameters

[5]: #setup

[6]: #parameters-1

[7]: #close

[8]: #parameters-2
## Support
Feel free to ask for support in [Discord Server](https://u.pgamerx.com/discord)
