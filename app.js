import express from "express";
import helmet from "helmet";
import logger from "morgan";
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import { userRouter } from "./router";

const app = express();
console.log("app typeof : "+ typeof(app));

const handleHome = (req, res) => res.send("Hello, this is home/");
const handleProfile = (req, res) => res.send("You are on my profile.");
/* // custom middleware
const betweenHome = (req, res, next) => {
    console.log("middleware test.");
    next();
}
*/

// set middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(helmet());
app.use(logger("dev"));

// get requests to a certain route
app.get("/", handleHome); // global router
app.get("/profile", handleProfile);

// '/user'로 접속하면 userRouter를 사용하겠다는 것
// !get() 
app.use("/user", userRouter); 


export default app;