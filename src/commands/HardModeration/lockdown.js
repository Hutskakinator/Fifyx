const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

let lockedChannels = {};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lockdown')
    .setDescription('Manage the lockdown of channels')
    .addSubcommand(subcommand =>
      subcommand
        .setName('start')
        .setDescription('Locks all channels in the server'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('end')
        .setDescription('Unlocks all previously locked channels')),
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const guild = interaction.guild;
    const memberRole = guild.roles.everyone;

    if (subcommand === 'start') {
      lockedChannels = {}; // Reset locked channels list

      // Lock all channels not already locked
      await Promise.all(
        guild.channels.cache.filter(channel => {
          const permissions = channel.permissionsFor(memberRole);
          return permissions.has(PermissionsBitField.Flags.SendMessages);
        }).map(async channel => {
          // Track previously unlocked channels
          lockedChannels[channel.id] = true;

          try {
            await channel.permissionOverwrites.edit({
              [memberRole.id]: {
                SendMessages: false,
              },
            });
            console.log(`Locked ${channel.name}`);
          } catch (error) {
            console.error(`Failed to lock ${channel.name}:`, error);
          }
        })
      );

      await interaction.reply('Server has been locked down.');
    } else if (subcommand === 'end') {
      // Unlock only channels that were locked by this script
      await Promise.all(
        Object.keys(lockedChannels).map(async channelId => {
          const channel = guild.channels.cache.get(channelId);

          if (lockedChannels[channelId] === true) {
            try {
              await channel.permissionOverwrites.edit({
                [memberRole.id]: {
                  SendMessages: null,
                },
              });
              console.log(`Unlocked ${channel.name}`);
            } catch (error) {
              console.error(`Failed to unlock ${channel.name}:`, error);
            }
          }
        })
      );

      await interaction.reply('Server lockdown has ended.');
    }
  },
};