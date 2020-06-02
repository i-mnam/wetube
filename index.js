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

// set routes
app.get("/", handleHome);
app.get("/profile", handleProfile);
app.listen(PORT, handleListening); //callback 으로 call