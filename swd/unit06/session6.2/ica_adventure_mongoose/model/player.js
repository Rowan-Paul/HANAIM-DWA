const mongoose = require("mongoose");

const locationSchema = require("./location");
const Location = mongoose.model("Location");

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
    type: [locationSchema],
    required: true,
  },
});

playerSchema.methods.getLocationInformation = async function () {
  currentMap = this.map.find(
    (location) => location._id === this.currentLocation
  );

  const locationInformation = {
    description: currentMap.description,
    exits: currentMap.exits,
  };

  return locationInformation;
};

playerSchema.methods.goToLocation = async function (newLocationName) {
  const newLocation = await Location.findById(newLocationName);
  
  if(!this.map.find(location => location._id === newLocationName)) {
    this.map.push(newLocation);
  }

  this.map.forEach((thisMap) => {
    if (thisMap._id === this.currentLocation) {
      if(thisMap.exits.includes(newLocationName)) {
        this.currentLocation = newLocationName
      }
    }
  });
};

//Place your model definition here below the method definitions
mongoose.model("Player", playerSchema);
