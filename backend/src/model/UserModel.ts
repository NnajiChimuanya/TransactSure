import mongoose from "mongoose";
import IUser from "../interface/UserInterface";
import Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "name required"],
  },
  email: {
    type: String,
    required: [true, "Email required"],
    unique: [true, "Email already exists"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number required"],
  },
  password: {
    type: String,
    required: [true, "Password required"],
  },
  paymentId: {
    type: [String],
  },
  balance: Number,
});

const user = mongoose.model<IUser>("user", userSchema);

export default user;
