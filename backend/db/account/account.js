const mongoose = require("mongoose");
const {Schema} = mongoose;
const bcrypt = require("bcryptjs");

const Account = new Schema({
    id : String,
    pw : String,
    nickname : String,
    admin : { type : Boolean, default : false}
});

Account.methods.generateHash = function(pw){
    return bcrypt.hashSync(pw, 8);
};

Account.methods.validateHash = function(pw){
    return bcrypt.compareSync(pw, this.pw);
};

module.exports = mongoose.model("account", Account);