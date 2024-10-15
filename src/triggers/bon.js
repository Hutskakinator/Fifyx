const { Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const config = require('../config');
const filter = require('../jsons/filter.json');

module.exports = {
    name: Events.MessageCreate,
    async execute(message, client, interaction) {
        if (message.author.bot) return;
        if (!message.content.toLowerCase().startsWith('fban')) return;

        const args = message.content.slice(5).trim().split(/ +/);
        const user = message.mentions.users.first() || client.users.cache.get(args[0]);
        const reason = args.slice(1).join(' ') || 'No reason provided';

        if (filter.words.some(word => reason.toLowerCase().includes(word))) {
            return message.reply({ content: `${client.config.filterMessage}`, ephemeral: true });
        }

        if (!user) {
            return message.reply({ content: 'Please mention a valid user to ban.', ephemeral: true });
        }

        const banDuration = Math.floor(Math.random() * 30) + 1;

        const fakeBanEmbed = new EmbedBuilder()
            .setAuthor({ name: `${client.user.username} Ban System`, iconURL: client.user.displayAvatarURL() })
            .setTitle(`${config.modEmojiHard} BAN ISSUED ${config.arrowEmoji}`)
            .setColor(config.embedModHard)
            .setDescription(`A very super real ban has been issued against a user.`)
            .addFields(
                { name: 'Target User', value: `${user.tag} (${user.id})`, inline: true },
                { name: 'Banned By', value: `${message.author.tag}`, inline: true },
                { name: 'Duration', value: `${banDuration} days`, inline: true },
                { name: 'Reason', value: reason }
            )
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: `This is a FAKE ban for entertainment purposes only` })
            .setTimestamp();

        const sentMessage = await message.reply({ embeds: [fakeBanEmbed]});
    }
};