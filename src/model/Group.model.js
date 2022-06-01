const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
    groupName: { type: String, require: true },
    supervisor: { type: String, require: true },
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
