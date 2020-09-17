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
    console.log(filepath);

    const data = {
        "password": req.body.password
    }

    const writeFile = await promiseWrappers.writeFileP(filepath, JSON.stringify(data));


    res.json("Sign up!");
})

router.post('/login', async (req, res) => {
    res.json("Sign in!");
})

router.post('/logout', async (req, res) => {
    res.json("Sign out!");
})

module.exports = router;