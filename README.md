<h1>Npm Package end</h1>
THE NPM PACKAGE IS SCHEDULED TO BE DISCONTINUED ON 4th OF JANUARY , 2021. THE BOT WILL STILL BE OPEN SOURCE ON 
[Github Repo](https://github.com/PGamerXstudio/discordticket)



<h1> This is for the ones using npm package</h1>
First you need to install using 

```npm i djs-tickets```

A Bot Example


```javascript
const discord = require('discord.js')
const client = new Discord.Client()
const ticket = require('discord-ticket')



ticket.token("1234567890") // Your discord bot token
ticket.prefix("tt!") // Whatever Prefix you wanna keep
ticket.status("Hi I am bot") // Bot's status


// Now you have access to following commands - [prefix]ticket-setup , [prefix]close and transcript will be automatically dmed 
// you can add other commands with discord.js

client.on("message", async message => {

if(message.content === 'tt!help'){
 const help = new Discord.MessageEmbed()
      .setTitle(`Discord Ticket`)
      .setDescription(
        `**My Commands**
                 PS: You should use tt! before every command XD`
      )
      .addField(
        `🚨 Instruction`,
        "Make sure to create a role called `Patrol` with exact capitalisation and also give it to moderators or one's you want to give ability to chat in ticket"
      )
      .addField(
        `Setup Command`,
        "**Admins** of the server should run `tt!ticket-setup` after doing above steps"
      )
      .addField(`Setup usage`, "`tt!ticket-setup #channel`")
      .addField(
        `Open Ticket`,
        `You just have to react with 🎫 in desired channel`
      )
      .addField(`Close Ticket`, "`tt!close` is command used to close a ticket")
      .addField(`Transcript`, "When close ticket command is run, chat history will be dmed you and will be sent in channel")

      .setColor("RANDOM");
    message.channel.send(help);
    }

})

client.login('1234567890') // Your Discord bot token
  ```
  
  
  <h2>If prefix is left blank ! is default one</h2>




<h1>Now for the people who are cloning this repo</h1>



This is project made by 
PGamerX

It's pretty easy to setup

Just clone it using git clone [LINK]

Then open config.json file and replace token with your bot's token

And also change the Prefix


