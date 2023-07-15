import { Request, Response } from "express";
import user from "../model/UserModel";
import { handleError } from "../utils/ErrorHandler";
import { paymentIdGenerator } from "../utils/paymentIdGenerator";

export const signup = async (req: Request, res: Response) => {
  const { name, email, phoneNumber, password } = req.body;

  try {
    let newUser = await user.create({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      paymentId: [paymentIdGenerator()],
      balance: 5000,
    });

    if (newUser) {
      res.json(newUser);
    } else {
      res.json({
        error: "Error occurred while creating user",
      });
    }
  } catch (err: any) {
    let errorMessage = handleError(err);
    res.json({
      status: "error",
      error: errorMessage,
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let client = await user.findOne({ email });

  try {
    if (client) {
      if (password === client?.password) {
        console.log("Found user");
        res.status(200).json(client);
      } else {
        throw Error("Invalid password");
      }
    } else {
      throw Error("Email not found");
    }
  } catch (err: any) {
    let errorMessage = handleError(err);
    res.json({
      status: "error",
      error: errorMessage,
    });
  }
};
