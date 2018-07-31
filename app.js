var express = require("express");
var path = require("path");
var app = express();
const cors = require("cors");

var app             = express();


app.use(cors());
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"));
});

