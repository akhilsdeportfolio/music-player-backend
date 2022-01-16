const mongoose = require('mongoose');
const albumSchema = new mongoose.Schema({
       name: { type: String, required: true },
       songs: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'song' }],
       genere: { type: String },
       year: { type: String },
       owner: { type: mongoose.SchemaTypes.ObjectId, ref: 'user' },
       coverphoto:{type:String,default:null}
},{versionKey:false,timestamps:true})
const Album = mongoose.model("album", albumSchema);
module.exports = Album;
