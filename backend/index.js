const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const config = require("./config.js");
const account = require("./routes/account");
const cookieParser = require("cookie-parser");
const post = require("./routes/Post");
const autoincrement = require("mongoose-auto-increment");
const path = require("path");

app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}));
app.use(morgan("dev"));
app.set('jwt-secret', config.secret);
app.use(express.static("images"));

app.use('/', express.static(path.join(__dirname, '../frontend/build')));
app.use("/account", account);
app.use("/post", post);
app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

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