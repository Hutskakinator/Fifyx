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
        const reason = args.slice(1).join(' ') || 'Nya~ No reason provided, but they probably just looked too cute and needed a silly timeout like a cat that can’t stop sneezing';

        if (filter.words.some(word => reason.toLowerCase().includes(word))) {
            return message.reply({ content: `${client.config.filterMessage}`, ephemeral: true });
        }

        if (!user) {
            return message.reply({ content: 'You need to mention a *real* user, not just your imaginary friend or that cactus you’ve been chatting with like it’s your best friend', ephemeral: true });
        }

        const banDuration = Math.floor(Math.random() * (69420000000000000000000000000000000000000000000000000 - 69 + 1)) + 69;
        
        const catGifs = [
            'https://media1.tenor.com/m/NUF-dzv7vGIAAAAd/hes-so-talented-fullsized.gif',
            'https://media1.tenor.com/m/O8Y9z4ALEpEAAAAC/cat-head-nodding-meme-headbutt-hit-funny-cat-silly-car.gif',
            'https://media.tenor.com/Lhnrz7clFroAAAAi/venya-cat.gif',
            'https://media1.tenor.com/m/BW_VH5MHa6YAAAAC/bye-chat-nuggg.gif',
            'https://media.tenor.com/d-2heKgP32MAAAAi/jinx-cat-jinx-the-cat.gif'
        ];
        const randomCatGif = catGifs[Math.floor(Math.random() * catGifs.length)];

        console.log(`Selected Cat GIF: ${randomCatGif}`);

        const goofyBanEmbed = new EmbedBuilder()
            .setAuthor({ name: `${client.user.username} UwU Ban Squad`, iconURL: client.user.displayAvatarURL() })
            .setTitle(`A TOTALLY SERIOUS ANNOUNCEMENT`)
            .setColor(config.embedModHard)
            .setDescription(`Prepare yourselves, for a *completely absurd and undeniably genuine* ban has been unleashed upon this unsuspecting user, nya~. We are entering the *Cat-a-strophic Ban Zone* where only the silliest cats dare tread.`)
            .addFields(
                { name: 'Ban Victim', value: `${user.tag} (${user.id}), just a poor little noodle in this vast spaghetti of a world`, inline: false },
                { name: 'Ban Giver', value: `${message.author.tag}, the ultimate ban-master and certified cat whisperer`, inline: false },
                { name: 'Duration of this Absolutely Real Ban', value: `${banDuration} whole days, which is like a thousand lifetimes in cat years`, inline: true },
                { name: 'Reason for Ban', value: reason + '  nyaa~ Because why not, right? Like, who even needs reasons when you have cats?', inline: false }
            )
            .setImage(randomCatGif)
            .setFooter({ text: `This ban is as real as cat`, iconURL: randomCatGif }) 
            .setTimestamp();

        await message.reply({ embeds: [goofyBanEmbed] });
    }
};
