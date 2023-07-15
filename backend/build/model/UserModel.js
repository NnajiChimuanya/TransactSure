"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
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
const user = mongoose_1.default.model("user", userSchema);
exports.default = user;
