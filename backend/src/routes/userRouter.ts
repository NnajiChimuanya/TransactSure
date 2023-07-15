import express, { Router } from "express";
import {
  generateNewId,
  deleteId,
  searchById,
  sendFunds,
  getTransactions,
} from "../controller/userController";

const userRouter: Router = express.Router();

userRouter.post("/generateNewId", generateNewId);

userRouter.post("/deleteId", deleteId);

userRouter.post("/searchById", searchById);

userRouter.post("/sendFunds", sendFunds);

userRouter.post("/getTransactions", getTransactions);
export default userRouter;
