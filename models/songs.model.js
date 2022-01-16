const mongoose = require('mongoose');
const songSchema = new mongoose.Schema({
       name: { type: String },
       creator: { type: mongoose.SchemaTypes.ObjectId, ref: 'user' },
       duration: { type: String }
}, { versionKey: false, timestamps: true });
const Song = mongoose.model("song",songSchema);
module.exports = Song;