const { SlashCommandBuilder } = require('discord.js');
const { ApexChat } = require('apexify.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('chat')
    .setDescription('Generate AI chat response')
<<<<<<< HEAD
    .addStringOption(option => option.setName('prompt').setDescription('The prompt for GPT').setRequired(true))
    .addStringOption(option => option.setName('modal').setDescription('The modal to use')
=======
    .addStringOption(option => option.setName('prompt').setDescription('The prompt for gpt').setRequired(true))
    .addStringOption(option => option.setName('model').setDescription('The model to use')
>>>>>>> upstream/main
    .addChoices(
            {name: "v3-32k", value: "v3-32k"},
            {name: "turbo", value: "turbo"},
            {name: "apexChat", value: "apexChat"},
            {name: "starChat", value: "starChat"},
            {name: "check docs", value: "check docs"}).setRequired(false)),
    async execute(interaction) {

<<<<<<< HEAD
        await interaction.deferReply();
        const modal = interaction.options.getString('modal') || "turbo";
        const prompt = interaction.options.getString('prompt');
        const userId = interaction.user.id;
=======
    await interaction.deferReply()
    const modal = interaction.options.getString('model') || "turbo";
    const prompt = interaction.options.getString('prompt');
>>>>>>> upstream/main

        try {
            const response = await ApexChat(modal, prompt, {
                userId: userId,
                memory: false,
                instruction: ""
            });

            await interaction.editReply({ content: `${response}` });
        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: `An error occurred while generating your response. Please try again later.`, ephemeral: true });
        }
    },
};
