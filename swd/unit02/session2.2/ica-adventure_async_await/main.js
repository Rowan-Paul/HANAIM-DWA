"use strict";

const readline = require("readline");
const game = require("./game");

const rl = readline.createInterface(process.stdin, process.stdout);

const COMMAND_ERROR = Symbol();

rl.setPrompt("action?> ");
rl.prompt();

rl.on("line", (line) => {
  const [command, argument] = line.trim().split(" ");
  //A)
  //Plaats hier de promise implementatie.
  execute(command, argument)
    .then((result) => {
      console.log(result);
      return rl.prompt();
    })
    .catch((error) => {
      if (error.code === COMMAND_ERROR) {
        console.log(error.message);
        return rl.prompt();
      } else {
        throw error;
      }
    });
}).on("close", function () {
  //DEFAULT ^c
  console.log("Leaving the game");
  process.exit(0);
});

async function execute(command, argument) {
  let response;
  switch (command) {
    case "where":
    case "w":
      const locationInformation = await game.getLocationInformation();
      response = `you are in ${locationInformation.description}`;
      response += "\nand you can go to these location(s): ";

      response += locationInformation.exits.reduce((allExits, exit) => {
        return allExits + `\n- ${exit}`;
      }, "");

      return response;

    case "goto":
    case "g":
    //C
    case "goto":
    case "g":
        const locationDescription = await game.goToLocation(argument);
        response = `you are in ${locationDescription}`;
        return response;

    default:
      let err = new Error(`The input: '${command}' is not defined`);
      err.code = COMMAND_ERROR;
      return Promise.reject(err);
  }
}
