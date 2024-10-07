module.exports = {
    name: "help",
    aliases: ["h"],
    async execute(message, client) {
        // Send a message to the channel where the command was invoked
        await message.channel.send("The `?help` command is undergoing maintanance. Please use `/help manual` or `/help server` instead for the most up-to-date information.");
    }
};
