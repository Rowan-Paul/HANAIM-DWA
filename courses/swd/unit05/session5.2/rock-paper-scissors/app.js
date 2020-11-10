var express = require("express");
var ws = require("ws");
var http = require("http");
var path = require("path");

var expressApp = express();
var httpServer = http.createServer();
var webSocketServer = new ws.Server({
   server: httpServer
});

expressApp.use(express.static(path.join(__dirname, "client-side")));

let messageCount = 0;

const rules = {
   Rock: {
      Scissors: true,
      Paper: false
   },
   Scissors: {
      Rock: false,
      Paper: true
   },
   Paper: {
      Rock: true,
      Scissors: false
   }
}


function opponentLeftMessage() {
   return JSON.stringify({ messageType: "OPPONENT LEFT" })
}

function playGame(player1Socket, player2Socket) {
   if (player1Socket.choice === player2Socket.choice) {
      return { isTie: true, player1: player1Socket, player2: player2Socket }
   } else if (rules[player1Socket.choice][player2Socket.choice]) {
      player1Socket.score++;
      return { isTie: false, winner: player1Socket, loser: player2Socket }
   } else {
      player2Socket.score++;
      return { isTie: false, winner: player2Socket, loser: player1Socket }
   }
}

function resetPlayers(p1, p2){
   p1.choice = undefined;
   p2.choice = undefined;
   messageCount = 0;
}

webSocketServer.on('connection', function connection(websocket) {
   console.log("CONNECTION CREATED");

   websocket.on('message', function incoming(message) {
      messageCount++

      const messageObject = JSON.parse(message)
      websocket.choice = messageObject.choice;
      websocket.username = messageObject.userName;

      if (websocket.score == undefined) {
         websocket.score = 0;
      }

      if (webSocketServer.clients.size == 2) {
         const [client1, client2] = webSocketServer.clients
         if (client1.choice != undefined && messageCount % 2 !== 0) {
            client1.send(JSON.stringify({ messageType: "CHOICE ACCEPTED", opponentName: client2.username }));
            client2.send(JSON.stringify({ messageType: "OPPONENT CHOICE", opponentName: client1.username }));
         } else if (client2.choice != undefined && messageCount & 2 !== 0) {
            client2.send(JSON.stringify({ messageType: "CHOICE ACCEPTED", opponentName: client1.username }));
            client1.send(JSON.stringify({ messageType: "OPPONENT CHOICE", opponentName: client2.username }));
         } else {
            let result = playGame(client1, client2);
            if (result.isTie) {
               result.player1.send(JSON.stringify({ messageType: "TIE" }));
               result.player2.send(JSON.stringify({ messageType: "TIE" }));
               resetPlayers(client1, client2)
            } else {
               result.winner.send(JSON.stringify({ messageType: "WIN", ownScore: result.winner.score, opponentScore: result.loser.score, opponentName: result.loser.username }));
               result.loser.send(JSON.stringify({ messageType: "LOSE", ownScore: result.loser.score, opponentScore: result.winner.score, opponentName: result.winner.username }));
               resetPlayers(client1, client2)
            }
         }
      }
   });


});

webSocketServer.on('error', function connection(websocket){
   if(webSocketServer.clients.size >= 3){
      console.log("nee")
   }
});


// connect the Express App to all incoming requests on the HTTP server
httpServer.on("request", expressApp);
httpServer.listen(3000, function () {
   console.log("The Server is listening on port 3000.");
});