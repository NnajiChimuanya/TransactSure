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
describe("GET /", () => {
  it("User exists", async () => {
    let payload = {
      email: "nnajichimuanya50@gmail.com",
      password: "password",
    };

    let res = await request(app).post("/auth/signin").send(payload);
    expect(res.status).toBe(200);
  }, 20000);

  it("User does not exists", async () => {
    let payload = {
      email: "nnajichi",
      password: "password",
    };

    let res = await request(app).post("/auth/signin").send(payload);
    expect(res.body.error).toBe("email does not exist");
  }, 20000);

  it("User exist, invalid password", async () => {
    let payload = {
      email: "nnajichimuanya50@gmail.com",
      password: "invalidPassword",
    };

    let res = await request(app).post("/auth/signin").send(payload);

    expect(res.body.status).toBe("error");
    expect(res.body.error).toBe("Invalid password");
  }, 20000);
});

//Sign in
describe("GET /", () => {
  it("Successful sign up", async () => {
    let payload = {
      name: "Nnaji Chimuanya",
      email: "nnajichimuanya@gmail.com",
      phonenUmber: "09131578808",
      password: "password",
    };

    let res = await request(app).post("/auth/signup").send(payload);
    expect(res.status).toBe(200);
  }, 20000);

  it("Email already exists", async () => {
    let payload = {
      name: "Nnaji Chimuanya",
      email: "nnajichimuanya50@gmail.com",
      phoneNumber: "09131578808",
      password: "password",
    };

    let res = await request(app).post("/auth/signup").send(payload);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("error");
    expect(res.body.error).toBe("Email already exists");
  }, 20000);
});

afterAll(async () => {
  await mongoose.connection.close();
});
