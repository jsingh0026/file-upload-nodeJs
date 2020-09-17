const mongoose = require('mongoose');

const membersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    memberImage: { type: String, required: true }
});

module.exports = mongoose.model('Member', membersSchema);