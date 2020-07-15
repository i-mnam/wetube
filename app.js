import express from "express";
import helmet from "helmet";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import routes from "./routes";

import { localsMiddleware } from "./middlewares";

import "./passport";

// why..
import session from "express-session";

const app = express();

// 주의) setting order
app.use(helmet());
// set application
app.set("view engine", "pug");

// set middleware
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
// directory에서 file을 보내주는 middleware
// 이건 좋은 예시가 아님) 서버에 file을 직접적으로 올리는 건 좋지 않음.
// static file (e.g. css, js, img,,,)을 사용하는 방법에 대해 알아봄.
// 큰 파일 용량으로 다른 사용을 막아버릴 수도 있음..

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: false,
    })
);
//[middlewares] req.user:undefined
//[middlewares] req.user:{ _id: 5f0f4428feffc711c332c03b, name: 't', email: 't@t.com', __v: 0 }
app.use(passport.initialize());
app.use(passport.session());
//a

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
