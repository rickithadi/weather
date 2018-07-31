var express = require("express");
var path = require("path");
var app = express();
const cors = require("cors");

var app             = express();


app.use(cors());
 app.set('view engine', 'html');

app.use(express.static(__dirname + "/dist"));
app.listen(process.env.PORT || 8080);
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"));
});

