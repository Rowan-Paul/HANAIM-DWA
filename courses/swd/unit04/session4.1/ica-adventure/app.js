"use strict";

const express = require("express");
const Game = require("./game.js");
const bodyParser = require("body-parser");

var session = require("express-session");

const app = express();

app.use(bodyParser.json());

app.use(session({resave: true, saveUninitialized: true, secret: "randomString"}));

const games = require("./routes/games.js");
app.use("/", games);

const actions = require("./routes/actions.js");
app.use("/", actions);

const players = require("./routes/players.js");
app.use("/", players);

const server = app.listen(3000, () => {
	console.log(`game server started on port ${server.address().port}`);
});
