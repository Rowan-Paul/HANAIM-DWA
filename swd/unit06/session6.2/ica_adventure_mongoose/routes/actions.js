"use strict";

const mongoose = require("mongoose");
require("../model/player.js");
require("../model/location.js");

const express = require("express");
const player = require("../model/player.js");
const router = express.Router();

const Player = mongoose.model("Player");
const Location = mongoose.model("Location");

router.get("/:player/where", (req, res) => {
  //1. find the correct player.
  Player.findById(req.params.player)
    .then((player) => {
      //2. call the correct method from the model.
      return player.getLocationInformation();
    })
    .then((locationInformation) => {
      //3. send back the response.
      res.json(locationInformation);
    });
});

router.put("/:player/goto", async (req, res) => {
  const playerId = req.params.player
  const player = await Player.findById(playerId)
  const newLocationName = req.query.location

  await player.goToLocation(newLocationName)

  await player.save()

  let newLocationDescription = await Location.findById(newLocationName)
  newLocationDescription = {description: newLocationDescription.description}

  res.json(newLocationDescription)
});

module.exports = router;
