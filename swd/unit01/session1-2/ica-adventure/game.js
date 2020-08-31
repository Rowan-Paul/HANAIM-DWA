// TODO:
// - delete item when it gets taken
// - fix bug where exits don't matter

let game = {};

let player = {
    location: 'town',
    items: []
};

let map = {
    forest: {
        description: 'a forest',
        items: ['mushroom'],
        exits: ['town']
    },
    town: {
        description: 'a town',
        items: ['coin','sword','axe'],
        exits: ['forest', 'mountain']
    },
    mountain: {
        description: 'a mountain range',
        items: [],
        exits: ['town']
    } 
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
   if(player.location == 'forest') {
       return map.forest.items;
   } else if(player.location == 'town') {
        return map.town.items;
    } else if(player.location == 'mountain') {
        return map.mountain.items;
    }
}

/**
 * Returns an object containing the description and the 
 * exits of the players current location on the map.
 * @returns {Object}
 */
game.getLocationInformation = () => {
    if(player.location == 'forest') {
        return {description: map.forest.description, exits: map.forest.exits};
    } else if(player.location == 'town') {
         return {description: map.town.description, exits: map.town.exits};
     } else if(player.location == 'mountain') {
         return {description: map.mountain.description, exits: map.mountain.exits};
     }
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
game.goToLocation = locationName => {
    if(player.location == 'forest') {
        if(locationName == 'town') {
            player.location = 'town';
            return 'town';
        }
        return 'forest';
    } else if(player.location == 'town') {
        if(locationName == 'forest') {
            player.location = 'forest';
            return 'forest';
        } else if(locationName == 'mountain') {
            player.location = 'mountain';
            return 'mountain';
        }
        return 'town';
     } else if(player.location == 'mountain') {
        if(locationName == 'town') {
            player.location = 'town';
            return 'town';
        }
        return 'mountain';
     }    
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
    if(player.location == 'forest' && map.forest.items.includes(itemName)) {
        // From stackoverflow: https://bit.ly/3hLgOrl
        // Remove the item from the location and add to inventory
        map.forest.items = map.forest.items.filter(e => e !== itemName);
        player.items.push(itemName);
        return itemName;
    } else if(player.location == 'town' && map.town.items.includes(itemName)) {
        map.town.items = map.forest.items.filter(e => e !== itemName);
        player.items.push(itemName);
        return itemName;
    } else if(player.location == 'mountain' && map.mountain.items.includes(itemName)) {
        map.town.items = map.forest.items.filter(e => e !== itemName);
        player.items.push(itemName);
        return itemName;
    }
    return 'nothing';
};



module.exports = game;
