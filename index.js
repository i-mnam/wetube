import express from "express";
import helmet from "helmet";
import logger from "morgan";

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
const stopMiddleware = (req, res, next) => {
    res.send("nothing happen.");
    // this connection gonna die.
}


// set all routes
app.use(helmet());
app.use(logger("dev"));
//app.use(betweenHome);
//app.use(stopMiddleware);

// next() : to call the next middleware.
app.get("/", betweenHome, stopMiddleware, handleHome); //target route
app.get("/profile", handleProfile);
app.listen(PORT, handleListening); //callback 으로 call