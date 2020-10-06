"use strict";

const mongoose = require("mongoose");
require("../model/player.js");
require('../model/location.js')

const express = require("express");
const player = require("../model/player.js");
const router = express.Router();

const Player = mongoose.model("Player");
//Don't forget to get your hands on the Location model when you need it.

router.get('/:player/where', (req, res) => {
  //1. find the correct player.
  Player.findById(req.params.player).then(player => {
      //2. call the correct method from the model.
      return player.getLocationInformation();
  }).then(locationInformation => {
      //3. send back the response.
      res.json(locationInformation);
  })
});

router.put("/:player/goto", (req, res) => {
  res.json("replace me with your code");
});

module.exports = router;
