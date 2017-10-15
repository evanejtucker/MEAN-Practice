
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database")

mongoose.connect(config.database, { useMongoClient: true });

mongoose.connection.on('connected', () => {
    console.log("connected to database " + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log("crror connecting to database " + err);
});

const users = require("./routes/users")

const app = express();

const port = 3000;

// cors middleware, allow requests to servers on different ports
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json())

app.use('/users', users);

// index route
app.get("/", (req, res) => {
    res.send("invalid endpoint");
})

app.listen(port, () => {
    console.log("app listening on port " + port);
});