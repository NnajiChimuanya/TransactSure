"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
const transactionsSchema = new Schema({
    emails: [String],
    senderEmail: String,
    recieverEmail: String,
    recieverId: String,
    amount: Number,
    dateOfTransaction: String,
});
const transactions = mongoose_1.default.model("transactions", transactionsSchema);
exports.default = transactions;
