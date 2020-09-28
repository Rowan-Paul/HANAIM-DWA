const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");

const promiseWrappers = require("../promise-wrappers");
const path = require("path");

const gameFilesFolderName = "game_files";

router.use(bodyParser.json());

const gameFileReader = async (req, res, next) => {
	try {
		req.fileName = path.join(
			gameFilesFolderName,
			`${req.params.player}.json`
		);
		req.fileContent = await promiseWrappers.readFileP(req.fileName);
		next();
	} catch (err) {
		err = new Error("Player does not exist");
		next(err);
	}
};

const readGameFileErrorHandler = async (err, req, res, next) => {
	if (!req.fileContent) {
		res.status(500).json(err.message);
	} else {
		next(err);
	}
};

router.use("/action/:player/", gameFileReader);
router.use(readGameFileErrorHandler);

router.get("/listPlayerFiles", async (req, res) => {
	const files = await promiseWrappers.readdirP(gameFilesFolderName);
	res.json(files);
});

router.delete("/deletePlayerFile/:player", async (req, res) => {
	const player = req.params.player;
	const file = path.join(gameFilesFolderName, `${player}.json`);
	const deletePlayer = await promiseWrappers.unlinkFileP(file);
	res.json({ result: "game " + player + ".json removed" });
});

router.post("/createPlayerFile", async (req, res) => {
	const playername = req.body.name;
	const newFile = playername + ".json";
	const filepath = path.join(gameFilesFolderName, newFile);
	console.log(filepath);
	const createFile = await promiseWrappers.createEmptyFileP(filepath);
	res.json("succes");
});

module.exports = router;
