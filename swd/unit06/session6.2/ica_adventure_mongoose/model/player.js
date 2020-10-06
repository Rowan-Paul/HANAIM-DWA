const mongoose = require('mongoose');

const locationSchema = require('./location')

const playerSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    items: {
        type: [String],
        required: true
    },
    currentLocation: {
        type: String,
        required: true
    },
    map: {
        type: [locationSchema],
        required: true
    }
});

playerSchema.methods.getLocationInformation = async function () {
    currentMap = this.map.find(location => location._id === this.currentLocation)

    const locationInformation = {
        description: currentMap.description,
        exits: currentMap.exits
    }

    return locationInformation;
}

playerSchema.methods.goToLocation = async function (newLocationName) {

}

//Place your model definition here below the method definitions
mongoose.model("Player", playerSchema);