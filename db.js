import mongoose from "mongoose";
import { addListener } from "nodemon";


// mongodb connect 할 때, 아래 설명대로 설정요청함.
mongoose.connect(
    "mongodb://localhost:27017/wetube", {
        useNewUrlParser: true,
        useFindAndModify: false
    }
);

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = () => console.log("❎ Fail to connect to DB")

db.once("open", handleOpen);
db.on("error", handleError);