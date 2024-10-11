const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");
const Version = require("../../schemas/versionSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("update")
    .setDescription("Create an update embed (OWNER ONLY COMMAND).")
    .setDefaultMemberPermissions(PermissionsBitField.Administrator)
    .addStringOption(option =>
      option.setName('category')
        .setDescription('Category of the update')
        .setRequired(true)
        .addChoices(
          { name: 'Bug Fix', value: 'Bug Fix' },
          { name: 'Feature Update', value: 'Feature Update' },
          { name: 'Performance Improvement', value: 'Performance Improvement' },
          { name: 'Other', value: 'Other' },
        ))
    .addStringOption(option =>
      option.setName('status')
        .setDescription('Status of the update')
        .setRequired(true)
        .addChoices(
          { name: 'Stable', value: 'Stable' },
          { name: 'Unstable', value: 'Unstable' },
          { name: 'Breaking', value: 'Breaking' },
        ))
    .addStringOption(option =>
      option.setName('description')
        .setDescription('Description of the update')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('commands')
        .setDescription('New commands (separate by semicolon ";")')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('released')
        .setDescription('Time since release')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('developer')
        .setDescription('Developer of the update')
        .setRequired(true)
        .addChoices(
          { name: 'Huts', value: '<@1286030761002012673>' },
          { name: 'Cat', value: '<@1286030761002012673>' },
          { name: 'Other', value: 'Other' },
        ))
    .addStringOption(option =>
      option.setName('notes')
        .setDescription('Update notes')
        .setRequired(false)),
  
  async execute(interaction, client) {
    try {
      if (interaction.user.id !== client.config.developers) {
        return await interaction.reply({ content: `${client.config.ownerOnlyCommand}`, ephemeral: true });
      }

      let versionDoc = await Version.findOne();
      if (!versionDoc) {
        versionDoc = new Version({ version: "1.0.0" });
        await versionDoc.save();
      }

      let [major, minor, patch] = versionDoc.version.split(".").map(Number);

      patch++;

      versionDoc.version = `${major}.${minor}.${patch}`;
      await versionDoc.save();

      const category = interaction.options.getString('category');
      const status = interaction.options.getString('status');
      const description = interaction.options.getString('description');
      const commands = interaction.options.getString('commands').split(';');
      const notes = interaction.options.getString('notes') || 'No additional notes.';
      const released = interaction.options.getString('released');
      const developer = interaction.options.getString('developer');

      let statusColor;
      switch (status) {
        case 'Stable':
          statusColor = `\`\`\`ansi\n\x1b[32mStable\x1b[0m\n\`\`\``;
          break;
        case 'Unstable':
          statusColor = `\`\`\`ansi\n\x1b[33mUnstable\x1b[0m\n\`\`\``;
          break;
        case 'Breaking':
          statusColor = `\`\`\`ansi\n\x1b[31mBreaking\x1b[0m\n\`\`\``;
          break;
        default:
          statusColor = status;
      }

      const embed = new EmbedBuilder()
        .setColor("#2b2d31")
        .setTitle('Fifyx Updates')
        .setDescription('⚠️ Please note that every update may not work as expected.\n❓ If you face any issues, report it with: `/report`!')
        .addFields(
          { name: 'Category:', value: `\`\`\`ansi\n\x1b[35m${category}\x1b[0m\n\`\`\``, inline: true },
          { name: 'Version:', value: `\`\`\`ansi\n\x1b[34m${versionDoc.version}\x1b[0m\n\`\`\``, inline: true },
          { name: 'Status:', value: statusColor, inline: true },
          { name: 'Description:', value: `\`\`\`ansi\n\x1b[38;5;214m${description}\x1b[0m\n\`\`\`` },
          {
            name: 'New Commands:', 
            value: commands.map((cmd, index) => `\`${index + 1}.\` </${cmd.trim()}:0>\n>`).join('\n\n'), 
          },
          { name: 'Update Notes:', value: notes, inline: true },
          { name: 'Update released:', value: released, inline: true },
          { name: 'Developer:', value: developer, inline: true }
        )
        .setFooter({ text: `Fifyx - 2024 • Today at ${new Date().toLocaleTimeString()}`, iconURL: client.user.displayAvatarURL() });
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
        console.error(error);
    }
  },
};
