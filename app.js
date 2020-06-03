import express from "express";
import helmet from "helmet";
import logger from "morgan";
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();


// set middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(helmet());
app.use(logger("dev"));

app.use("/", globalRouter);
app.use("/users", userRouter); 
app.use("/videos", videoRouter);


export default app;