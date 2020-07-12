import "./db";
import app from "./app";
import dotenv from "dotenv";
//import "./models/Video"; // import 해도 DB에는 영향 없음.

dotenv.config();

const PORT = process.env.PORT || 4000;
const handleListening = () => console.log(`✅ Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
