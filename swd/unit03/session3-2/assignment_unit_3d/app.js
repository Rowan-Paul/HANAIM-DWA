"use strict";

const express = require("express");
const Game = require("./game.js");
const promiseWrappers = require("./promise-wrappers");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

const gameFilesFolderName = "game_files";

app.use(bodyParser.json());

const gameFileReader = async (req, res, next) => {
	try {
		// Middleware can't acces req.params
		// https://github.com/expressjs/express/issues/2088
		req.fileName = path.join(
			gameFilesFolderName,
			`${req.params.player}.json`
		);
		req.fileContent = await promiseWrappers.readFileP(req.fileName);
		next();
	} catch {
		next("Player does not exist");
	}
};

// TODO: make this actually do something
// without chrashing the entire app
const fileErrorHandler = async (err, req, res, next) => {
	if (!req.fileContent) {
		res.status(500).json(err.message);
	} else {
		next(err);
	}
};

app.get("/listPlayerFiles", async (req, res) => {
	const folder = await promiseWrappers.readdirP(gameFilesFolderName);

	res.json(folder);
});

app.get("/action/:player/where", gameFileReader, async (req, res) => {
	const gameState = JSON.parse(req.fileContent);
	const game = new Game(gameState);
	const locationInformation = await game.getLocationInformation();
	res.json(locationInformation);
});

app.delete("/deletePlayerFile/:player", async (req, res) => {
	const user = req.params.player;
  const fileName = path.join(gameFilesFolderName, `${user}.json`);
  
	const deletePlayer = await promiseWrappers.unlinkFileP(fileName);
	res.json({ result: "game " + user + ".json  removed" });
});

app.post("/action/:player/goto", async (req, res) => {
	//Paste your implementation from assignment unit 3c here
	const user = req.params.player;
	const fileName = path.join(gameFilesFolderName, `${user}.json`);
	const fileContent = await promiseWrappers.readFileP(fileName);
	const gameState = JSON.parse(fileContent);
	const game = new Game(gameState);

	const gotoLocation = await game.goToLocation(req.query.location);
	// Overwrite the current file with new gamestate
	const writeFile = await promiseWrappers.writeFileP(
		fileName,
		JSON.stringify(game.state)
	);

	res.json(gotoLocation);
});

app.post("/action/:player/arise", async (req, res) => {
	//Paste your implementation from assignment unit 3c here
	const fileName = path.join(
		gameFilesFolderName,
		`${req.params.player}.json`
	);

	const data = {
		player: {
			name: req.params.player,
			location: req.body.start,
			items: req.body.inventory,
		},
	};

	const game = new Game();

	const writeFile = await promiseWrappers.writeFileP(
		fileName,
		JSON.stringify(data)
	);
	const startNew = await game.startNew(
		data.player.location,
		data.player.items
	);
	res.json(startNew);
});

const server = app.listen(3000, () => {
	console.log(`game server started on port ${server.address().port}`);
});
