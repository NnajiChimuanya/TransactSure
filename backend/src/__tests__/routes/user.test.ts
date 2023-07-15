import mongoose from "mongoose";
import request from "supertest";
import app from "../../server";

import dotenv from "dotenv";
dotenv.config();

beforeAll(async () => {
  await mongoose
    .connect(process.env.mongo_uri)
    .then(() => {})
    .catch((err) => console.log(err));
});

//Sign in
describe("User Payment Id operations /user", () => {
  it("Generate new PaymentId", async () => {
    let payload = {
      email: "nnajichimuanya50@gmail.com",
      password: "password",
    };

    let res = await request(app).post("/user/generateNewId").send(payload);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("error");
  }, 20000);

  it("Delete Id", async () => {
    let payload = {
      email: "nnajichimuanya50@gmail.com",
      password: "password",
      id: "hjjkkkk",
    };

    let res = await request(app).post("/user/deleteId").send(payload);
    expect(res.status).toBe(200);
  }, 20000);
});

//Sign in
describe("Search by Id /user/searchById", () => {
  it("Search user by paymentID", async () => {
    let payload = {
      id: "0m12oob",
    };

    let res = await request(app).post("/user/searchById").send(payload);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("success");
  }, 20000);
});

afterAll(async () => {
  await mongoose.connection.close();
});
