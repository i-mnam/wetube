import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();
// mongodb connect 할 때, 아래 설명대로 설정요청함.
mongoose.connect(
    process.env.MONGO_URL, {
        useNewUrlParser: true,
        useFindAndModify: false
    }
);

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = () => console.log("❎ Fail to connect to DB")

db.once("open", handleOpen);
db.on("error", handleError);