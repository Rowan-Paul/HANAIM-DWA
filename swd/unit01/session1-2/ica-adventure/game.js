let game = {};

let player = {
  location: "town",
  items: [],
};

let map = {
  forest: {
    description: "a forest",
    items: ["mushroom"],
    exits: ["town"],
  },
  town: {
    description: "a town",
    items: ["coin", "sword", "axe"],
    exits: ["forest", "mountain"],
  },
  mountain: {
    description: "a mountain range",
    items: [],
    exits: ["town"],
  },
};

/**
 * Returns the items the player is carrying.
 * @returns {Array}
 */
game.getInventory = () => {
  return player.items;
};

/**
 * Returns the list of items at the player's current location.
 * @returns {Array}
 */
game.getItems = () => {
  return map[player.location].items;
};
/**
 * Returns an object containing the description and the
 * exits of the players current location on the map.
 * @returns {Object}
 */
game.getLocationInformation = () => {
  return {
    description: map[player.location].description,
    exits: map[player.location].exits,
  };
};

/**
 * Checks if there is a connection between the player current location
 * and the location represented by the given locationName and moves the
 * player to that location.
 * Otherwise it changes nothing.
 *
 * @param {String} locationName - The name of the location the player wants to move to.
 * @returns {String} - The location the player is in after executing this function
 */
game.goToLocation = (locationName) => {
  if (map[player.location].exits.includes(locationName)) {
    player.location = locationName;
    return locationName;
  }

  return player.location;
};

/**
 * Checks if the item with the given itemName is in the list of
 * items of the player's current location and transfers it to the player.
 * Otherwise it changes nothing.
 *
 * @param {String} itemName - The name of the item.
 * @returns {String} - The name of the item that was taken. If nothing was taken, it returns
 * the string 'nothing'
 */
game.takeItem = (itemName) => {
  if (game.getItems().includes(itemName)) {
    const itemIndex = map[player.location].items.indexOf(itemName);

    if (itemIndex > -1) {
      map[player.location].items.splice(itemIndex, 1);
      player.items.push(itemName);

      return itemName;
    }

    return "nothing";
  }
};

module.exports = game;
