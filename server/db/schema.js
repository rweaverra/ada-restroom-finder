const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const restroomSchema = new mongoose.Schema ({

name: String,
street: String,
city: String,
state: String,
accessible: Boolean,
comment: String,
latitude: Number,
longitude: Number,
created_at: {type: Date, default: Date.now},
updated_at: {type: Date, default: Date.now},
downvote: Number,
upvote: Number,
approved: Boolean,
distance: Number

});

const RestroomLocation = mongoose.model('restroomlocations', restroomSchema);


module.exports = {
  RestroomLocation,
  restroomSchema
};

