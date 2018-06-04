const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const morgan = require("morgan");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}));
app.use(morgan("dev"));

/////////////////////////////////////////////////////

const db = mongoose.connection;
db.on("error", console.error);
db.once("connected", () => {
    console.log("mongoDB is connected...");
});
mongoose.connect("mongodb://localhost/bigraptor");

/////////////////////////////////////////////////////

app.listen(4000, () => {
    console.log("Port4000 is Connected..");
});