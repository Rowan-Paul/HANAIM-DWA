"use strict";

const readline = require("readline");
const game = require("./game");
const { runInContext } = require("vm");

const rl = readline.createInterface(process.stdin, process.stdout);

const COMMAND_ERROR = Symbol();

rl.setPrompt("action?> ");
rl.prompt();

rl.on("line", (line) => {
  const [command, argument] = line.trim().split(" ");
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

function execute(command, argument) {
  let response;
  switch (command) {
    case "where":
    case "w":
      return game.getLocationInformation().then((locationInformation) => {
        response = `you are in ${locationInformation.description}`;
        response += "\nand you can go to these location(s): ";

        response += locationInformation.exits.reduce((allExits, exit) => {
          return allExits + `\n- ${exit}`;
        }, "");

        return Promise.resolve(response);
      });
    case "goto":
    case "g":
    //C)
    case 'goto':
        case 'g':
            return game.goToLocation(argument).then((locationDescription) => {
                response = `you are in ${locationDescription}`;
                return Promise.resolve(response);
            }).catch((error) => {
                return Promise.reject(error.message);
            });
    default:
      let err = new Error(`The input: '${command}' is not defined`);
      err.code = COMMAND_ERROR;
      return Promise.reject(err);
  }
}
