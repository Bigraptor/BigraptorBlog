const mongoose = require("mongoose");
const { Schema } = mongoose;

const Post = new Schema({
    category : String,
    title : String,
    content : String,
    created : {type : Date, default : Date.now}
});

module.exports = mongoose.model("post", Post);