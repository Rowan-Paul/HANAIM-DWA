const pw = require('./promise-wrappers');
const { writeFile } = require('fs');


users = [
    {
        "account": "ashlee_waters",
        "username": "ASH"
    },
    {
        "account": "hilario_muller",
        "username": "Hilario_Muller29"
    },
    {
        "account": "serena_klein",
        "username": "Serena.Klein"
    }
];

var prom = [];

Promise.all(prom).then((values) => {
    console.log("done");
})

pw.readFileP('users.json').then((users) => {
    usersnew = JSON.parse(users);
    usersnew.forEach(user => {
        pw.writeFileP(`${user.account}`, user.username).then((ps) => {
            prom.push(ps);
        }).catch(err => {
            console.log(err.message);
        })
    });
})