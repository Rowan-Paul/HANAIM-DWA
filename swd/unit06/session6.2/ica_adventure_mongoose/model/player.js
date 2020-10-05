const mongoose = require("mongoose");
require('./location')
const Location = mongoose.model('Location')

const playerSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  items: {
    type: [String],
    required: true,
  },
  currentLocation: {
    type: String,
    required: true,
  },
  map: {
    type: [Map],
    of: Location,
    required: true,
  },
});

playerSchema.methods.getLocationInformation = async function () {

};

playerSchema.methods.goToLocation = async function (newLocationName) {};

//Place your model definition here below the method definitions
module.exports = mongoose.model('Player', playerSchema)