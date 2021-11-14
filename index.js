const Discord = require("discord.js")

const enmap = require("enmap");
const settings = new enmap({
    name: "settings",
    autoFetch: true,
    cloneLevel: "deep",
    fetchAll: true
  });

async function start(client){
if(!client) throw new Error("Client not provided, Ticket system will not be working.")
client.on("messageReactionAdd", async (reaction, user, message) => {
  if (user.partial) await user.fetch();
  if (reaction.partial) await reaction.fetch();
  if (reaction.message.partial) await reaction.message.fetch();
  if (user.bot) return;

  let ticketid = await settings.get(`${reaction.message.guild.id}-ticket`);

  if (!ticketid) return;

  if (reaction.message.id == ticketid && reaction.emoji.name == "🎫") {
    reaction.users.remove(user);

    reaction.message.guild.channels
      .create(`ticket-${user.username}`, {
        permissionOverwrites: [
          {
            id: user.id,
            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
          },
          {
            id: reaction.message.guild.roles.everyone,
            deny: ["VIEW_CHANNEL"]
          },
          {
            id: reaction.message.guild.roles.cache.find(
              role => role.name === "Patrol"
            ),
            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
          }
        ],
        type: "text"
      })
      .then(async channel => {
        channel.send(
          `<@${user.id}>`,
          new Discord.MessageEmbed()
            .setTitle("Welcome to your ticket!")
            .setDescription("Support Team will be with you shortly")
            .setColor("RANDOM")
        );
      });
  }
});
}
async function setup(message,channelID){
    const channel = message.guild.channels.cache.find(channel => channel.id === channelID);
    let sent = await channel.send(
        new Discord.MessageEmbed()
          .setTitle("Ticket System")
          .setDescription("React to open a ticket!")
          .setFooter("Ticket System")
          .setColor("00ff00")
      );
  
      sent.react("🎫");
      settings.set(`${message.guild.id}-ticket`, sent.id);
  
      message.channel.send("Ticket System Setup Done!");
}

async function close(message,transcript){
  if (!message.channel.name.includes("ticket-"))
  return message.channel.send("You cannot use that here!");
let channel = message.channel

if(transcript === true){
  channel.messages.fetch({limit:80})
  .then(function(messages) {
    let content = messages.map(message => message.content && message.content).join("\n");
    message.author.send(`Transcript for your ticket in ${message.guild.name} Server`);
    message.author.send({ files: [{ name: "transcript.txt", attachment: Buffer.from(content) }] });
  message.channel.send(`I have dmed you transcript if your dms are opened. Deleting channel in 20 seconds`)
  message.channel.send(`Just in case Your dms are closed here is transcript`)
  message.channel.send({ files: [{ name: "transcript.txt", attachment: Buffer.from(content) }] });  
  })
 setTimeout(function() {
    message.channel.delete();
     },20000)
    }
    else{
      message.channel.delete()
    }
}
module.exports.setup = setup
module.exports.start = start
module.exports.close = close
