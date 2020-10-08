const Discord = require("discord.js");
const client = new Discord.Client({
  partials: ["MESSAGE", "USER", "REACTION"]
});
const enmap = require("enmap");
const { token, prefix } = require("./config.json");
client.on("ready", () =>
  console.log(
    `[READY] ${client.user.tag} has been successfully booted up!`,
    client.user.setActivity(`in ${client.guilds.cache.size} servers | tt!help`)
  )
);

const settings = new enmap({
  name: "settings",
  autoFetch: true,
  cloneLevel: "deep",
  fetchAll: true
});

client.on("ready", () => {
  console.log("ready");
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command == "ticket-setup") {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.reply(`Become a admin BOOMER`);
    let channel = message.mentions.channels.first();
    if (!channel) return message.reply("Usage: `tt!ticket-setup #channel`");
    const rle = message.guild.roles.cache.find(role => role.name === "Patrol");
    if (!rle)
      return message.reply(
        "Hmmm I coudl't find a role called `Patrol` Make sure you have a role called `Patrol` with same capitalisation and all you moderators are havingp it"
      );

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

  if (command === "help") {
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
      .addField(
        "**Links**",
        "**[Invite Me](https://discord.com/oauth2/authorize?client_id=745926398212046878&scope=bot&permissions=8) | " +
          "[Support Server](https://invite.gg/blacksheep)** | "
      )
      .setColor("RANDOM");
    message.channel.send(help);
  }

if (command == "close") {
    if (!message.channel.name.includes("ticket-"))
      return message.channel.send("You cannot use that here!");
    let channel = message.channel
    channel.messages.fetch({limit:80})
    .then(function(messages) {
        let content = messages.map(message => message.content && message.content).join("\n");
        message.author.send(`Transcript for your ticket in ${message.guild.name} Server`);
        message.author.send({ files: [{ name: "test.txt", attachment: Buffer.from(content) }] });
      message.channel.send(`I have dmed you transcript if your dms are opened. Deleting channel in 20 seconds`)
      message.channel.send(`Just in case Your dms are closed here is transcript`)
      message.channel.send({ files: [{ name: "test.txt", attachment: Buffer.from(content) }] });  


      })
       setTimeout(function() {
        message.channel.delete();
                    }, 20000);
  }
});

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
            .addField(
              "**Links**",
              "**[Invite Me](https://discord.com/oauth2/authorize?client_id=745926398212046878&scope=bot&permissions=8) | " +
                "[Support Server](https://invite.gg/blacksheep)** | "
            )
        );
      });
  }
});

client.login(token);
