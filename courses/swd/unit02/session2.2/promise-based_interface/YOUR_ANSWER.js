const fs = require("fs");

//Definitie van de promise-based interface voor readFile
function readFileP(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

//Gebruik van de promise-based interface
readFileP("test.txt").then((value) => {
  console.log(value.toString());
});
