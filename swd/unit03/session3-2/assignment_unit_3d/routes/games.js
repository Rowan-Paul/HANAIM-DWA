var express = require("express");
var router = express.Router();


// middleware that is specific to this router
const gameFilesFolderName = "game_files";

router.use(function timeLog(req, res, next) {
	console.log("Time: ", Date.now());
	next();
});

router.get("/action/:player/where", async (req, res) => {
	const gameState = JSON.parse(req.fileContent);
	const game = new Game(gameState);
	const locationInformation = await game.getLocationInformation();
	res.json(locationInformation);
});

router.post("/action/:player/goto", async (req, res) => {
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

router.post("/action/:player/arise", async (req, res) => {
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


// define the home page route
router.get("/", function (req, res) {
	res.send("Root");
});

module.exports = router;