import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/db/db.js";

import userRoute from "./src/routes/user.route.js";
import authRoute from "./src/routes/auth.route.js";
import newsRoute from "./src/routes/news.route.js";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

connectDB();
app.use(express.json());

app.use('/user', userRoute);
app.use('/auth', authRoute);
app.use('/news', newsRoute);

app.listen(port, () => console.log(`Server is running on port: ${port}`));