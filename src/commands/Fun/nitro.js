const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nitro')
        .setDescription('Generates a random Nitro gift link.'),
    async execute(interaction) {

        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let nitroCode = '';

        for (let i = 0; i < 16; i++) {
            nitroCode += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        const embed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle('🎉 A Wild Nitro Gift Appears!')
            .setDescription('**Nitro** is being delivered! Click the button to claim your gift.')
            .setImage('https://i.imgur.com/w9aiGNt.png')
            .setFooter({ text: 'Expires in 48 hours' });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Claim')
                    .setStyle(ButtonStyle.Link)
                    .setURL(`https://discord.gift/${nitroCode}`)
                    .setEmoji('🎁')
            );

        await interaction.reply({ content: "Nitro gift generated and sent to the channel!", ephemeral: true });

        await interaction.channel.send({
            embeds: [embed],
            components: [row]
        });
    }
}
