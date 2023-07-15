import mongoose from "mongoose";
import ITransactions from "../interface/Transactions";
import Schema = mongoose.Schema;

const transactionsSchema = new Schema({
  emails: [String],
  senderEmail: String,
  recieverEmail: String,
  recieverId: String,
  amount: Number,
  dateOfTransaction: String,
});

const transactions = mongoose.model<ITransactions>(
  "transactions",
  transactionsSchema
);

export default transactions;
