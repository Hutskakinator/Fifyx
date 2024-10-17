const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
    name: Events.MessageCreate,
    async execute(message, client) {
        const allowedGuildId = '1291743742440509460';
        const allowedRoleId = '1295830867070947362';

        if (!message.guild || message.guild.id !== allowedGuildId) return;

        if (!message.member || !message.member.roles.cache.has(allowedRoleId)) return;

        const commandPatterns = {
            fssu: /^fssu(?!vote)/i,
            fssuvote: /^fssuvote/i,
            fssd: /^fssd/i,
        };

        const serverInfo = {
            name: 'LCRPC | Realistic | Strict | Growing |',
            code: 'LcRPC',
            owner: 'Alfsdad516516',
            icon: 'https://cdn.discordapp.com/icons/1291743742440509460/88e75f2bd77bec00d25a4f6740203c5a.png?size=1024&format=webp&quality=lossless&width=0&height=256',
            image: 'https://i.imgur.com/JYrIJ4F.jpeg',
        };

        if (commandPatterns.fssu.test(message.content)) {
            const ssuEmbed = new EmbedBuilder()
                .setColor(0x7289DA)
                .setTitle('🚨 Server Startup Notification 🚨')
                .setDescription('Enjoy your time on the server!')
                .addFields(
                    { name: 'Server Name', value: serverInfo.name, inline: true },
                    { name: 'Server Code', value: serverInfo.code, inline: true },
                    { name: 'Server Owner', value: serverInfo.owner, inline: false },
                    { name: 'Host', value: `${message.author}`, inline: true },
                    { name: 'Join Us!', value: 'Use the provided server code to join!', inline: false }
                )
                .setImage(serverInfo.image)
                .setThumbnail(serverInfo.icon)
                .setFooter({ text: 'Server is now active!', iconURL: serverInfo.icon })
                .setTimestamp();

            await message.channel.send({ content: '<@&1295389365182398674>', embeds: [ssuEmbed] });
        }

        if (commandPatterns.fssuvote.test(message.content)) {
            const voteDuration = 45;

            const voteEmbed = new EmbedBuilder()
                .setColor(0xFFD700)
                .setTitle('🗳️ Server Startup Vote 🗳️')
                .setDescription('Vote on whether to start the server now!')
                .addFields(
                    { name: 'Server Name', value: serverInfo.name, inline: true },
                    { name: 'Vote Duration', value: `${voteDuration} minutes`, inline: true },
                    { name: 'Instructions', value: 'React with ✅ to start the server. 5 ticks required.', inline: false }
                )
                .setImage(serverInfo.image)
                .setThumbnail(serverInfo.icon)
                .setFooter({ text: "Vote initiated! Tick the checkmark to vote. Voters must join.", iconURL: serverInfo.icon })
                .setTimestamp();

            const sentMessage = await message.channel.send({ content: '<@&1295389365182398674>', embeds: [voteEmbed] });
            await sentMessage.react('✅');
        }

        if (commandPatterns.fssd.test(message.content)) {
            const userMention = `<@${message.author.id}>`;

            const shutdownEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle('🛑 Server Shutdown Notification 🛑')
                .setDescription('The server is shutting down. Thank you for being a part of our community!')
                .addFields(
                    { name: 'Server Name', value: serverInfo.name, inline: true },
                    { name: 'Shutdown by', value: userMention, inline: true },
                    { name: 'Feedback', value: 'Let us know what you think about the server!', inline: false }
                )
                .setImage(serverInfo.image)
                .setThumbnail(serverInfo.icon)
                .setFooter({ text: 'Server is now shutting down!', iconURL: serverInfo.icon })
                .setTimestamp();

            await message.channel.send({ embeds: [shutdownEmbed] });
        }
    }
};