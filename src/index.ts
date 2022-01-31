/** Have to Import Discord/Enmap the old way :( */
  const Discord = require('discord.js');
  const enmap = require('enmap');
  
  /** Initialise EnMap */
  const settings = new enmap({
    name: 'settings',
    autoFetch: true,
    cloneLevel: 'deep',
    fetchAll: true,
  });
  
  const start = (client: any /** Doesn't allow me to use Discord.Client*/, MessageEmbed?: any) => {
    if (!client) throw new Error('Client not provided, kindly refer to the documentation!');
    if (typeof client !== typeof Discord.Client)
      throw new Error('Invalid Client provided, kindly refer to the documentation!');
  
    client.on(
      'messageReactionAdd',
      async (
        reaction: {
          partial: any;
          fetch: () => any;
          message: {
            partial: any;
            fetch: () => any;
            guild: {
              id: any;
              channels: {
                create: (
                  arg0: string,
                  arg1: {
                    permissionOverwrites: (
                      | { id: any; allow: string[]; deny?: undefined }
                      | { id: any; deny: string[]; allow?: undefined }
                    )[];
                    type: string;
                  },
                ) => Promise<any>;
              };
              roles: { everyone: any; cache: any[] };
            };
            id: any;
          };
          emoji: { name: string };
          users: { remove: (arg0: any) => void };
        },
        user: { partial: any; fetch: () => any; bot: any; username: any; id: any },
        message: any,
      ) => {
        if (user.partial) await user.fetch();
        if (reaction.partial) await reaction.fetch();
        if (reaction.message.partial) await reaction.message.fetch();
        if (user.bot) return;
  
        const ticketid = await settings.get(`${reaction.message.guild.id}-ticket`);
  
        if (!ticketid) return;
  
        if (reaction.message.id == ticketid && reaction.emoji.name == '🎫') {
          reaction.users.remove(user);
  
          reaction.message.guild.channels
            .create(`ticket-${user.username}`, {
              permissionOverwrites: [
                {
                  id: user.id,
                  allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                },
                {
                  id: reaction.message.guild.roles.everyone,
                  deny: ['VIEW_CHANNEL'],
                },
                {
                  id: reaction.message.guild.roles.cache.find((role: { name: string }) => role.name === 'Patrol'),
                  allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                },
              ],
              type: 'text',
            })
            .then(async (channel: { send: (arg0: any) => void }) => {
              const NewEmbed = new Discord.MessageEmbed()
                .setTitle('Welcome to your ticket!')
                .setDescription('Support Team will be with you shortly')
                .setColor('RANDOM');
              const embed = MessageEmbed ? MessageEmbed : NewEmbed;
  
              channel.send({ embeds: [embed] });
            });
        }
      },
    );
  };
  
  const setup = async (MessageObject: any, ChannelID: string, Embed?: any) => {
    const channel = MessageObject.guild.channels.cache.find((channel: { id: any }) => channel.id === ChannelID);
    const temp_embed = new Discord.MessageEmbed()
      .setTitle('Ticket System')
      .setDescription('React to open a ticket!')
      .setFooter('Ticket System')
      .setColor('00ff00');
  
    const embed = Embed ? Embed : temp_embed;
    const sent = await channel.send({ embeds: [embed] });
    sent.react('🎫');
    settings.set(`${MessageObject.guild.id}-ticket`, sent.id);
  
    MessageObject.channel.send('Ticket System Setup Done!');
  };
  
  const close = async (message: any, transcript: any) => {
    if (!message.channel.name.includes('ticket-')) return message.channel.send('You cannot use that here!');
    const channel = message.channel;
  
    if (transcript === true) {
      channel.messages.fetch({ limit: 80 }).then(function (messages: any[]) {
        const content = messages.map((message: { content: any }) => message.content && message.content).join('\n');
        message.author.send(`Transcript for your ticket in ${message.guild.name} Server`);
        message.author.send({ files: [{ name: 'transcript.txt', attachment: Buffer.from(content) }] });
        message.channel.send(
          `I have dmed you transcript if your dms are opened. Deleting channel in 20 seconds. Here is the transcript as well.`,
        );
        message.channel.send({ files: [{ name: 'transcript.txt', attachment: Buffer.from(content) }] });
      });
      setTimeout(function () {
        message.channel.delete();
      }, 20000);
    } else {
      message.channel.delete();
    }
  };

  export { start, setup, close };
  