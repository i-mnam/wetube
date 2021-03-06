import "./db";
import app from "./app";
import dotenv from "dotenv";
import "./models/User"; // import 해도 DB에는 영향 없음.
import "./models/Comment";

dotenv.config();

const PORT = process.env.PORT || 4000;
const DOMAIN = "http://localhost"; // FAIL
const handleListening = () =>
    console.log(`✅ Listening on: ${DOMAIN}:${PORT}`);

app.listen(PORT, handleListening);
