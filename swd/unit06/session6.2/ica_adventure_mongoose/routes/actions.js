"use strict";

const mongoose = require("mongoose");
require("../model/player.js");

const express = require("express");
const player = require("../model/player.js");
const router = express.Router();

const Player = mongoose.model("Player");
//Don't forget to get your hands on the Location model when you need it.

router.get("/:player/where", (req, res) => {
  Player.findById(req.params.player).then((player) => {
      // doesn't work without first converting to text
      // and then reconverting to JSON
      // cause why not
    let data = JSON.stringify(player.map);
    data = JSON.parse(data);

    data.forEach((thisMap) => {
      if (thisMap._id === player.currentLocation) {
        res.json({
          description: thisMap.description,
          exits: thisMap.exits,
        });
      }
    });
  });
});

router.put("/:player/goto", (req, res) => {
  res.json("replace me with your code");
});

module.exports = router;
