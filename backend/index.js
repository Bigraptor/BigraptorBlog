const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const config = require("./config.js");
const account = require("./routes/account");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}));
app.use(morgan("dev"));
app.set('jwt-secret', config.secret)

app.use("/account", account);

/////////////////////////////////////////////////////

const db = mongoose.connection;
db.on("error", console.error);
db.once("connected", () => {
    console.log("mongoDB is connected...");
});
mongoose.connect(config.mongodbUri);

/////////////////////////////////////////////////////

app.listen(4000, () => {
    console.log("Port4000 is Connected..");
});