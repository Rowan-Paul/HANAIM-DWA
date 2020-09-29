var express = require("express");
var ws = require("ws");
var http = require("http");
var path = require("path");
const { verify } = require("crypto");

var theExpressApp = express();
var theHttpServer = http.createServer();
var webSocketServer = new ws.Server({
	server: theHttpServer
});

let messageAmount = 0

// Code to setup the Express app (middleware, routes) can go here.
theExpressApp.use(express.static(path.join(__dirname, "client-side")));

// Object with game logic
const rules = {
   Rock: {
      Scissors: true,
      Paper: false,
   },
   Scissors: {
      Paper: true,
      Rock: false,
   },
   Paper: {
      Rock: true,
      Scissors: false,
   }
}

// const preFabMessage = {
// 	CHOICE_ACCEPTED: () => {},
// 	CHOICE_NOT_ACCEPTED: () => {},
// 	OPPONENT_CHOICE: () => {},
// 	WIN: () => {},
// 	LOSER: () => {},
// 	TIE: tieMessage
// }

// function sendChoiceAcceptedMessage(message) {
//    console.log("sendChoiceAcceptedMessage")
// }

// function tieMessage() {
//    console.log("tieMessage")
// 	return { messageType: TIE };
// }

// function winMessage() {
// 	return { messageType: WIN };
// }

function playGame(player1Socket, player2Socket) {
   console.log(player1Socket.choice)
	if (player1Socket.choice === player2Socket.choice) {
      // tie
      return { isTie: true, player1: player1Socket, player2: player2Socket }
	} else if (rules[player1Socket.choice][player2Socket.choice]) {
		// player 1 wins
		return { isTie: false, winner: player1Socket, loser: player2Socket };
	} else {
		// player 2 wins
		return { isTie: false, winner: player2Socket, loser: player1Socket };
	}
}

// Connect to the server
webSocketServer.on("connection", function connection(websocket) {
	// When the server gets a message
	websocket.on("message", function incoming(message) {
      messageAmount++;

      const messageObject = JSON.parse(message);
		websocket.choice = messageObject.choice;
      
		if (messageAmount === 2) {
			let [client1, client2] = webSocketServer.clients
         let result = playGame(...webSocketServer.clients);

			if (result.isTie) {
            // send tie message
            console.log("TIE")
            result.player1.send("Draw!")
            result.player2.send("Draw!")
			} else {
				result.winner.send("Winner");
				result.loser.send("Loser");
			}
		}
	});
});

theHttpServer.on("request", theExpressApp);
theHttpServer.listen(3000, function () {
	console.log("The Server is lisening on port 3000.");
});
