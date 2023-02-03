import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/db/db.js";

dotenv.config();
connectDB();

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.listen(port, () => console.log(`Server is running on port: ${port}`));