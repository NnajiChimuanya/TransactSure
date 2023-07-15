"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const userRouter = express_1.default.Router();
userRouter.post("/generateNewId", userController_1.generateNewId);
userRouter.post("/deleteId", userController_1.deleteId);
userRouter.post("/searchById", userController_1.searchById);
userRouter.post("/sendFunds", userController_1.sendFunds);
userRouter.post("/getTransactions", userController_1.getTransactions);
exports.default = userRouter;
