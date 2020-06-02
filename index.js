const express = require("express"); // typeof(express) : function
const app = express();

const PORT = 4000;


function handleListening() {
    console.log(`Listening on :: http://localhost:${PORT}`);
}

function handleHome(req, res) {
    console.log("request:" + req);
    // GET method는 응답 받기 전까지는 계속 로딩 중이다.
    res.send("Hello from home");
}

function handleProfile(req, res) {
    res.send("You are on my profile.");
}

// set routes
app.get("/", handleHome);
app.get("/profile", handleProfile);
app.listen(PORT, handleListening); //callback 으로 call