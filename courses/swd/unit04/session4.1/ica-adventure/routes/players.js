const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');

const promiseWrappers = require('../promise-wrappers');
const path = require('path');

const playerFilesFolderName = 'player_files';

router.use(bodyParser.json());

router.post('/register', async (req, res) => {
    const playername = req.body.player;
    const newFile = playername+".json";
    const filepath = path.join(playerFilesFolderName, newFile);

    const data = {
        "password": req.body.password
    }
    const writeFile = await promiseWrappers.writeFileP(filepath, JSON.stringify(data));

    res.json("Sign up!");
})

router.post('/login', async (req, res) => {
    const playername = req.body.player;
    const newFile = playername+".json";
    const filepath = path.join(playerFilesFolderName, newFile);
    fileContent = await promiseWrappers.readFileP(filepath);

    userInput = {"password": req.body.password};

    if(JSON.stringify(userInput) === fileContent) {
        req.session.player = req.body.player
        res.json("Sign in!");
    } else {
        res.json("password error");
    }
})

router.post('/logout', async (req, res) => {
    const signOut = delete req.session.player;
    res.json("Sign out!");
})

module.exports = router;