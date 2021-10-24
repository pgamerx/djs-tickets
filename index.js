const discord = require("discord.js")

const enmap = require("enmap");
const settings = new enmap({
    name: "settings",
    autoFetch: true,
    cloneLevel: "deep",
    fetchAll: true
  });

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

async function close(){
    const 
}