import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";

import mongoose from "mongoose";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";

import express, { Request, Response, Express } from "express";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: /* "https://skye-wallet.vercel.app" */ "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Skye Wallet user microservice");
});

app.use("/auth", authRouter);
app.use("/user", userRouter);

export default app;
