import mongoose from "mongoose";
import request from "supertest";
import app from "../server";

import dotenv from "dotenv";
dotenv.config();

beforeAll(async () => {
  await mongoose
    .connect(process.env.mongo_uri)
    .then(() => {})
    .catch((err) => console.log(err));
});

describe("GET /", () => {
  it("Skye Wallet user microservice", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    res.off;
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
