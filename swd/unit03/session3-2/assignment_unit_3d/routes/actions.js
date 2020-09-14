var express = require("express");
var router = express.Router();

// middleware that is specific to this router
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

app.delete("/deletePlayerFile/:player", async (req, res) => {
	const user = req.params.player;
	const fileName = path.join(gameFilesFolderName, `${user}.json`);

	const deletePlayer = await promiseWrappers.unlinkFileP(fileName);
	res.json({ result: "game " + user + ".json  removed" });
});

app.post("/createPlayerFile", async (req, res) => {
	const fileName = path.join(gameFilesFolderName, `${req.body.name}.json`);
	const createFile = await promiseWrappers.createEmptyFileP(fileName);

	res.json("Created new file: " + fileName);
});

// define the home page route
router.get("/", function (req, res) {
	res.send("Root");
});

module.exports = router;