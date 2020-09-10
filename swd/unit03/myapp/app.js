const express = require("express");
const app = express();
const port = 3000;

let nRequests = 0;

app.get("/", (req, res) => {
	nRequests++;
    console.log("nRequests: " + nRequests);
    
    // res.send("Hello World!");
    
    console.log(req.headers['user-agent']);
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
