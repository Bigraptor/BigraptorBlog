const mongoose = require("mongoose");
const { Schema } = mongoose;
const autoincrement = require("mongoose-auto-increment");

const Post = new Schema({
    no : {type : Number, default : 0},
    category : String,
    title : String,
    content : String,
    created : {type : Date, default : Date.now}
});

module.exports = mongoose.model("post", Post);
autoincrement.initialize(mongoose.connection);

Post.plugin(autoincrement.plugin, {
    model: 'Post',
    field: 'no',
    startAt: 1,
    incrementBy: 1
  });