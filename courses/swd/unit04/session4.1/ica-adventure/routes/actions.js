const express = require("express");
const router = express.Router();

const Game = require('../game.js');

const bodyParser = require('body-parser');

const promiseWrappers = require('../promise-wrappers');
const path = require('path');

router.use(bodyParser.json());

const gameStateReader = async (req, res, next) => {
    try {
        const gameState = JSON.parse(req.fileContent);
        req.game = new Game(gameState);
        next();
    } 
    catch (err) {
        next(err);
    }
}

router.use('/action/where', gameStateReader);
router.use('/action/goto', gameStateReader);

router.get('/action/where', async (req, res) => {
    const locationInformation = await req.game.getLocationInformation();
    res.json(locationInformation);
});

router.post('/action/goto', async (req, res) => {
    const locationDescription = await req.game.goToLocation(req.query.location);
    const writeFile = await promiseWrappers.writeFileP(req.fileName, JSON.stringify(game.state));
    res.json(locationDescription);
});

// TODO: fix arise so it gives the map data?
// when you create a new game with arise you don't
// give any map data so the game doesn't know any
router.post('/action/arise', async (req, res) => {
    if(req.session.player) {
        const game = new Game();

        const data = {
            player: {
                name: req.session.player,
                location: req.body.start,
                items: req.body.inventory
            }
        }

        const writeFile = await promiseWrappers.writeFileP(req.fileName, JSON.stringify(data));
        const startNew = await game.startNew(data.player.location, data.player.items);

        res.json(startNew);
    } else {
        res.json("user not logged in");
    }
});

module.exports = router;