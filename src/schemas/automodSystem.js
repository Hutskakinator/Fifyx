const mongoose = require("mongoose");

const autoModSchema = new mongoose.Schema({
    guildId: String,
    ruleName: String,
    logChannelId: String,
    customMessage: String,
    mentionLimit: Number,
    keywordFilter: [String]
});

const AutoMod = mongoose.model("AutoMod", autoModSchema);

module.exports = AutoMod;