'use strict';

const express = require('express');
const Game = require('./game.js');
const promiseWrappers = require('./promise-wrappers');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const gameFilesFolderName = 'game_files';

app.use(bodyParser.json());

app.get('/action/:player/where', async (req, res) => {
    const fileName = path.join(gameFilesFolderName, `${req.params.player}.json`);
    const fileContent = await promiseWrappers.readFileP(fileName);
    
    const gameState = JSON.parse(fileContent);
    const game = new Game(gameState);
    
    const locationInformation = await game.getLocationInformation();
    res.json(locationInformation);
});


app.post('/action/:player/goto', async (req, res) => {
   //Paste your implementation from assignment unit 3b here
   const user = req.params.player;
    const fileName = path.join(gameFilesFolderName, `${user}.json`);
    const fileContent = await promiseWrappers.readFileP(fileName);
    const gameState = JSON.parse(fileContent);
    const game = new Game(gameState);
 
    const gotoLocation = await game.goToLocation(req.query.location);
    // Overwrite the current file with new gamestate
    const writeFile = await promiseWrappers.writeFileP(fileName, JSON.stringify(game.state));
    
    res.json(gotoLocation);
});

app.post('/action/:player/arise', async (req, res) => {
    const fileName = path.join(gameFilesFolderName, `${req.params.player}.json`);
    
    const data = {
        player: {
            name: req.params.player,
            location: req.body.start,
            items: req.body.inventory
        }
    }

    const game = new Game();

    const writeFile = await promiseWrappers.writeFileP(fileName, JSON.stringify(data));
    const startNew = await game.startNew(data.player.location, data.player.items);
    res.json(startNew);
});

const server = app.listen(3000, () => {
    console.log(`game server started on port ${server.address().port}`);
});