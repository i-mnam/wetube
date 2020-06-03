//import "core-js";

//const express = require("express"); // typeof(express) : function
import express from "express";
const app = express();

const PORT = 4000;

const handleListening = () => console.log(`Listening on :: http://localhost:${PORT}`);
const handleHome = (req, res) => {
    console.log("console_ Hello Home");
    res.send("Hello From home");
}
const handleProfile = (req, res) => res.send("You are on my profile.");
const betweenHome = (req, res, next) => {
    console.log("middleware test.");
    next();
}


// set routes
app.use(betweenHome); // 응답하기 전 프로세스 처리를 할 수 있으므로 선언 위치가 중요하다.
//app.get("/", betweenHome, handleHome);
app.get("/", handleHome);
app.get("/profile", handleProfile);
app.listen(PORT, handleListening); //callback 으로 call