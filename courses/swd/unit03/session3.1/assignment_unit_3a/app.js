'use strict';

const express = require('express');
const game = require('./game.js');
const { goToLocation } = require('./game.js');

const app = express();


app.get('/action/where', async (req, res) => {
    const locationInformation = await game.getLocationInformation();
    res.json(locationInformation);
});

app.post('/action/goto', (req, res) => {
    goToLocation(req.query.location);
});

const server = app.listen(3000, () => {
    console.log(`game server started on port ${server.address().port}`);
});