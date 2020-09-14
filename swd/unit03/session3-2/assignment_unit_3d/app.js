"use strict";

const express = require("express");
const Game = require("./game.js");
const promiseWrappers = require("./promise-wrappers");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.json());

const server = app.listen(3000, () => {
	console.log(`game server started on port ${server.address().port}`);
});

var actions = require('./routing/actions.js')
app.use('/routing', actions)

var actions = require('./routing/games.js')
app.use('/routing', games)