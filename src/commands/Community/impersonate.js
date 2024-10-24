const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField } = require("discord.js");
const filter = require('../../jsons/filter.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("impersonate")
    .setDescription("Makes you look like someone else")
    .setDefaultMemberPermissions(PermissionFlagsBits.createWebhook)
    .addUserOption(option => option.setName("user").setDescription("Mention a user to impersonate").setRequired(true))
    .addStringOption(option => option.setName("message").setDescription("What message do you want the user to type?").setRequired(true)),

    async execute(interaction, client) {
        const { options } = interaction;

        const user = options.getUser("user");
        const message = options.getString("message");

        if (filter.words.includes(message)) {
            return interaction.reply({ content: `${client.config.filterMessage}`, ephemeral: true });
        }

        if (!interaction.guild) {
            return await interaction.reply({ content: "This command can only be used in a server.", ephemeral: true });
        }

        const member = await interaction.guild.members.fetch(user.id).catch(() => null);

        if (!member) {
            return await interaction.reply({ content: "User not found in this server.", ephemeral: true });
        }

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.createWebhook)) {
            return await interaction.reply({ content: `${client.config.noPerms}` });
        }

        if (message.includes('@everyone') || message.includes('@here')) {
            return await interaction.reply({ 
                content: `You **cannot** mention \`\`everyone/here\`\` with this command`, 
                ephemeral: true
            });
        }

        interaction.channel.createWebhook({ name: member.displayName, avatar: member.displayAvatarURL({ dynamic: true }) })
            .then((webhook) => {
                webhook.send({ content: message });
                setTimeout(() => {
                    webhook.delete();
                }, 3000);
            })
            .catch(error => {
                console.error("Failed to create webhook:", error);
                return interaction.reply({ content: "Failed to create webhook.", ephemeral: true });
            });
        
        interaction.reply({ content: `${member.displayName} has been **successfully** impersonated <#${interaction.channel.id}>!`, ephemeral: true });
    },
};
