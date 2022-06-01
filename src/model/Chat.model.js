const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
    group: { type: mongoose.Types.ObjectId, ref: "Group", require: true },
    message: { type: String },
    sender: { type: String, enum: ["supervisor", "group"] },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
