const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bans a user from the server')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption(option => option.setName('user').setDescription('The user to be banned (mention or ID)').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('The reason for the ban').setRequired(false)),
  async execute(interaction, client) {
    const userInput = interaction.options.getString('user');
    let userID;

    // Try to parse the input as a mention
    const mentionMatch = userInput.match(/^<@!?(\d+)>$/);
    if (mentionMatch) {
      userID = mentionMatch[1];
    } else {
      // Try to parse the input as a userID
      if (/^\d+$/.test(userInput)) {
        userID = userInput;
      } else {
        return interaction.reply({ content: `Could not find user ${userInput}`, ephemeral: true });
      }
    }

    const reason = interaction.options.getString('reason') || '`Reason for ban not given`';

    let guild = await interaction.guild.fetch();

    const dmEmbed = new EmbedBuilder()
      .setAuthor({ name: `${client.user.username} ban command` })
      .setColor(client.config.embedModHard)
      .setTitle(`> ${client.config.modEmojiHard}  Ban command ${client.config.arrowEmoji}`)
      .setDescription(`\n ${userID}, \n \`You have been banned from ${guild.name}\` \n \n \n **Reason:** \n ${reason} \n \n **Staff Member:** \n ${interaction.user.tag} | (<@${interaction.user.id}>:${interaction.user.id}) \n`)
      .setTimestamp()
      .setThumbnail(client.user.avatarURL())
      .setFooter({ text: `Banned - ${interaction.guild.name} ${client.config.devBy}` });

    const banEmbed = new EmbedBuilder()
      .setAuthor({ name: `${client.user.username} ban command ${client.config.devBy}` })
      .setColor(client.config.embedModHard)
      .setTitle(`> ${client.config.modEmojiHard}  Ban command ${client.config.arrowEmoji}`)
      .addFields({ name: 'User', value: `> ${userID}`, inline: true})
      .addFields({ name: 'Reason', value: `> ${reason}`, inline: true})
      .setTimestamp()
      .setThumbnail(client.user.avatarURL())
      .setFooter({ text: `Someone got got struck by the ban hammer` });

    const perm = interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers);
    if (interaction.member.id === userID) return await interaction.reply({ content: 'You **cannot** use the `ban` command on yourself...', ephemeral: true });
    if (!perm)
      return await interaction.channel.sendTyping(),
      interaction.reply({ content: `${client.config.noPerms}`, ephemeral: true });

    const user = await client.users.fetch(userID).catch(() => null);
    if (!user) {
      // User is not in the server, ban them by ID
      await interaction.guild.bans.create(userID, { reason }).catch(err => {
        return interaction.reply({ content: `**Couldn't** ban user specified!`, ephemeral: true });
      });
    } else {
      // User is in the server, ban them and remove them from the server
      await interaction.guild.members.ban(user, { reason }).catch(err => {
        return interaction.reply({ content: `**Couldn't** ban user specified!`, ephemeral: true });
      });
    }

    await user.send({ embeds: [dmEmbed] }).catch((err) => { return client.logs.error('[BAN] Failed to DM user.') });

    if (ban) {
      await interaction.channel.sendTyping(),
      await interaction.reply({ embeds: [banEmbed] })
    } else if (!ban) {
      interaction.reply({ content: `Failed to ban **${userID}** from **${guild.name}**`, ephemeral: true })
    }
  }
};