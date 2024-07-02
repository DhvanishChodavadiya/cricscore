import express from "express";
import cookieparser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({limit: "500mb"}));
app.use(express.urlencoded({extended: true, limit: "1000mb", parameterLimit: 100000}));
app.use(express.static("public"));
app.use(cookieparser());

import userRouter from "./routes/user.route.js";
app.use("/api/v1/user",userRouter);

export { app }