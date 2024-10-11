const mongoose = require("mongoose");

const versionSchema = new mongoose.Schema({
    version: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model("Version", versionSchema);