const { Events, EmbedBuilder } = require("discord.js");
const config = require('../config');
const filter = require('../jsons/filter.json');

module.exports = {
    name: Events.MessageCreate,
    async execute(message, client, interaction) {
        if (message.author.bot) return;
        if (!message.content.toLowerCase().startsWith('realban')) return;

        const args = message.content.slice(8).trim().split(/ +/);
        const user = message.mentions.users.first() || client.users.cache.get(args[0]);
        const reason = args.slice(1).join(' ') || 'No reason provided, but it was probably something incredibly ridiculous like forgetting to feed their virtual pet rock!';

        if (filter.words.some(word => reason.toLowerCase().includes(word))) {
            return message.reply({ content: `${client.config.filterMessage}`, ephemeral: true });
        }

        if (!user) {
            return message.reply({ content: 'You need to mention a real user, not just your imaginary friend or that cactus you have been talking to all week!', ephemeral: true });
        }

        const banDuration = Math.floor(Math.random() * 30) + 1;
        const catGifs = [
            'https://media1.tenor.com/m/NUF-dzv7vGIAAAAd/hes-so-talented-fullsized.gif',
            'https://media1.tenor.com/m/O8Y9z4ALEpEAAAAC/cat-head-nodding-meme-headbutt-hit-funny-cat-silly-car.gif',
            'https://media.tenor.com/Lhnrz7clFroAAAAi/venya-cat.gif',
            'https://media1.tenor.com/m/BW_VH5MHa6YAAAAC/bye-chat-nuggg.gif',
            'https://media.tenor.com/m/VutiGPkI_lAAAAAd/cat-cats.gif',
            'https://media.tenor.com/d-2heKgP32MAAAAi/jinx-cat-jinx-the-cat.gif'
        ];
        const randomCatGif = catGifs[Math.floor(Math.random() * catGifs.length)];

        const goofyBanEmbed = new EmbedBuilder()
            .setAuthor({ name: `${client.user.username} Silly Ban Squad`, iconURL: client.user.displayAvatarURL() })
            .setTitle(`A Totally Serious Announcement`)
            .setColor(config.embedModHard)
            .setDescription(`Prepare yourselves, for a *completely absurd and undeniably genuine* ban has been unleashed upon this unsuspecting user`)
            .addFields(
                { name: 'Ban Victim', value: `${user.tag} (${user.id})`, inline: true },
                { name: 'Ban Giver', value: `${message.author.tag}`, inline: true },
                { name: 'Duration of this Absolutely Real Ban', value: `${banDuration} days (or until they figure out how to properly pet a cat without being scratched)`, inline: true },
                { name: 'Reason for Ban', value: reason }
            )
            .setImage(randomCatGif)
            .setFooter({ text: `This ban is as real as cat trust` })
            .setTimestamp();

        await message.reply({ embeds: [goofyBanEmbed] });
    }
};
