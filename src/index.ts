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

const start = (client: any /** Doesn't allow me to use Discord.Client*/, MessageEmbed: any) => {
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

      let ticketid = await settings.get(`${reaction.message.guild.id}-ticket`);

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
          .then(async (channel: { send: (arg0: string, arg1: any) => void }) => {
            channel.send(
              `<@${user.id}>`,
              new Discord.MessageEmbed()
                .setTitle('Welcome to your ticket!')
                .setDescription('Support Team will be with you shortly')
                .setColor('RANDOM'),
            )
            const NewEmbed = new Discord.MessageEmbed()
            .setTitle('Welcome to your ticket!')
            .setDescription('Support Team will be with you shortly')
            .setColor('RANDOM');
            const embed = MessageEmbed ? MessageEmbed : NewEmbed
            ;
          });
      }
    },
  );
};

export {
  start
}
export const Greeter = (name: string) => `Hello ${name}`;
