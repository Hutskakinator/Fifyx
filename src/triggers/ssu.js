const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
    name: Events.MessageCreate,
    async execute(message, client) {
        const allowedGuildId = '1291743742440509460';
        const allowedRoleId = '1295830867070947362';

        if (message.guild.id !== allowedGuildId) return;
        if (!message.member.roles.cache.has(allowedRoleId)) return;

        const fssuRegex = /^fssu(?!vote)/i;
        const fssuvoteRegex = /^fssuvote/i;
        const fssdRegex = /^fssd/i;

        // Server startup command
        if (fssuRegex.test(message.content)) {
            const serverName = 'LCRPC | Realistic | Strict | Growing |';
            const serverCode = 'LcRPC';
            const serverOwner = 'Alfsdad516516';

            const ssuEmbed = new EmbedBuilder()
                .setColor(0x7289DA)
                .setTitle('🚨 Server Startup Notification 🚨')
                .setDescription('Enjoy your time on the server!')
                .addFields(
                    { name: 'Server Name', value: serverName, inline: true },
                    { name: 'Server Code', value: serverCode, inline: true },
                    { name: 'Server Owner', value: serverOwner, inline: false },
                    { name: 'Host', value: `${message.author}`, inline: true },
                    { name: 'Join Us!', value: 'Use the provided server code to join!', inline: false }
                )
                .setImage('https://i.imgur.com/JYrIJ4F.jpeg')
                .setThumbnail('https://cdn.discordapp.com/icons/1291743742440509460/88e75f2bd77bec00d25a4f6740203c5a.png?size=1024&format=webp&quality=lossless&width=0&height=256')
                .setFooter({ text: 'Server is now active!', iconURL: 'https://cdn.discordapp.com/icons/1291743742440509460/88e75f2bd77bec00d25a4f6740203c5a.png?size=1024&format=webp&quality=lossless&width=0&height=256' })
                .setTimestamp();

            await message.channel.send({ content: '<@&1295389365182398674>', embeds: [ssuEmbed] });
        }

        if (fssuvoteRegex.test(message.content)) {
            const serverName = 'LCRPC | Realistic | Strict | Growing |';
            const voteDuration = 45;

            const voteEmbed = new EmbedBuilder()
                .setColor(0xFFD700)
                .setTitle('🗳️ Server Startup Vote 🗳️')
                .setDescription('Vote on whether to start the server now!')
                .addFields(
                    { name: 'Server Name', value: serverName, inline: true },
                    { name: 'Vote Duration', value: `${voteDuration} minutes`, inline: true },
                    { name: 'Instructions', value: 'React with ✅ to start the server. 5 ticks required.', inline: false }
                )
                .setImage('https://i.imgur.com/JYrIJ4F.jpeg')
                .setThumbnail('https://cdn.discordapp.com/icons/1291743742440509460/88e75f2bd77bec00d25a4f6740203c5a.png?size=1024&format=webp&quality=lossless&width=0&height=256')
                .setFooter({ text: "Vote initiated! Tick the checkmark to vote. Voters must join.", iconURL: 'https://cdn.discordapp.com/icons/1291743742440509460/88e75f2bd77bec00d25a4f6740203c5a.png?size=1024&format=webp&quality=lossless&width=0&height=256' })
                .setTimestamp();

            const sentMessage = await message.channel.send({ content: '<@&1295389365182398674>', embeds: [voteEmbed] });
            await sentMessage.react('✅');
        }

        if (fssdRegex.test(message.content)) {
            const serverName = 'LCRPC | Realistic | Strict | Growing |';
            const userMention = `<@${message.author.id}>`; // Format the user mention
        
            const shutdownEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle('🛑 Server Shutdown Notification 🛑')
                .setDescription('The server is shutting down. Thank you for being a part of our community!')
                .addFields(
                    { name: 'Server Name', value: serverName, inline: true },
                    { name: 'Shutdown by', value: userMention, inline: true }, // Use the formatted mention
                    { name: 'Feedback', value: 'Let us know what you think about the server!', inline: false }
                )
                .setImage('https://i.imgur.com/JYrIJ4F.jpeg')
                .setThumbnail('https://cdn.discordapp.com/icons/1291743742440509460/88e75f2bd77bec00d25a4f6740203c5a.png?size=1024&format=webp&quality=lossless&width=0&height=256')
                .setFooter({ text: 'Server is now shutting down!', iconURL: 'https://cdn.discordapp.com/icons/1291743742440509460/88e75f2bd77bec00d25a4f6740203c5a.png?size=1024&format=webp&quality=lossless&width=0&height=256' })
                .setTimestamp();
        
            // Send only the embed to the channel
            await message.channel.send({ embeds: [shutdownEmbed] });
            }
        }}