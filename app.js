import express from "express";
import helmet from "helmet";
import logger from "morgan";
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import routes from "./routes";

import { localsMiddleware } from "./middlewares";

const app = express();

// 주의) setting order
app.use(helmet());
// set application
app.set("view engine", "pug");

// set middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(logger("dev"));
app.use(localsMiddleware);

// 복습) use custom middleware
// app.use(function(req, res, next) {});
// app.use((req, res, next) => {});
// const localsMiddleware = (req, res, next) => {}

// set intro-router
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);


export default app;