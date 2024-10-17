const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: "help",
    aliases: ["h"],
    async execute(message, client) {
        try {
            const homepageEmbed = new EmbedBuilder()
                .setColor(client.config.embedColor)
                .setTitle("Welcome to the Fifyx Help page")
                .setDescription("This command will give you a list of available commands. **__We do not recommend using this command directly as it is buggy and will not work as expected.__**")  
                .setThumbnail(client.user.displayAvatarURL())
                .setFooter({ text: "Fifyx Help" })
                .addFields(
                    { name: "Recommended Usage", value: "For the most up-to-date information, please use `/help-manual` or `/help-server`." }
                )
                .setTimestamp();

            const commandFields = client.commands.map(command => ({
                name: `/${command.data.name}`,
                value: command.data.description || "No description available.",
                inline: false
            }));
            const prefixFields = client.pcommands.map(command => ({
                name: `${client.config.prefix}${command.name}`,
                value: command.description || "No description available.",
                inline: false
            }));

            const allFields = [...commandFields, ...prefixFields];

            const pages = [];
            const itemsPerPage = 20;

            pages.push(homepageEmbed);
m
            if (allFields.length > 0) {
                for (let i = 0; i < allFields.length; i += itemsPerPage) {
                    const embed = new EmbedBuilder()
                        .setColor(client.config.embedColor)
                        .setTitle("Bot Commands")
                        .setDescription("Here is a list of available commands:")
                        .addFields(allFields.slice(i, i + itemsPerPage))
                        .setTimestamp();

                    pages.push(embed);
                }
            }

            let currentPage = 0;

            const backButton = new ButtonBuilder()
                .setCustomId('back')
                .setLabel('Back')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(currentPage === 0);

            const nextButton = new ButtonBuilder()
                .setCustomId('next')
                .setLabel('Next')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(pages.length <= 1);

            const row = new ActionRowBuilder().addComponents(backButton, nextButton);

            const msg = await message.channel.send({ 
                embeds: [pages[currentPage]], 
                components: [row], 
                fetchReply: true 
            });

            // Button interaction filter
            const filter = (buttonInteraction) => buttonInteraction.user.id === message.author.id;

            const collector = msg.createMessageComponentCollector({ filter, time: 120000 }); // 2 minutes

            collector.on('collect', async (buttonInteraction) => {
                await buttonInteraction.deferUpdate(); // Acknowledge the button click

                if (buttonInteraction.customId === 'back') {
                    currentPage--;
                } else if (buttonInteraction.customId === 'next') {
                    currentPage++;
                }

                // Update button states
                backButton.setDisabled(currentPage === 0);
                nextButton.setDisabled(currentPage === pages.length - 1);

                // Update embed and buttons
                await msg.edit({ embeds: [pages[currentPage]], components: [new ActionRowBuilder().addComponents(backButton, nextButton)] });
            });

            collector.on('end', () => {
                backButton.setDisabled(true);
                nextButton.setDisabled(true);
                msg.edit({ components: [new ActionRowBuilder().addComponents(backButton, nextButton)] });
            });
        } catch (error) {
            console.error("Error in help command:", error);
            await message.channel.send({ content: "An error occurred while trying to display the help menu. Please try again later.", ephemeral: true });
        }
    }
};
