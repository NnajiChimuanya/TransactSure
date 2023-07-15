"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const UserModel_1 = __importDefault(require("../model/UserModel"));
const ErrorHandler_1 = require("../utils/ErrorHandler");
const paymentIdGenerator_1 = require("../utils/paymentIdGenerator");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phoneNumber, password } = req.body;
    try {
        let newUser = yield UserModel_1.default.create({
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            password: password,
            paymentId: [(0, paymentIdGenerator_1.paymentIdGenerator)()],
            balance: 5000,
        });
        if (newUser) {
            res.json(newUser);
        }
        else {
            res.json({
                error: "Error occurred while creating user",
            });
        }
    }
    catch (err) {
        let errorMessage = (0, ErrorHandler_1.handleError)(err);
        res.json({
            status: "error",
            error: errorMessage,
        });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let client = yield UserModel_1.default.findOne({ email });
    try {
        if (client) {
            if (password === (client === null || client === void 0 ? void 0 : client.password)) {
                console.log("Found user");
                res.status(200).json(client);
            }
            else {
                throw Error("Invalid password");
            }
        }
        else {
            throw Error("Email not found");
        }
    }
    catch (err) {
        let errorMessage = (0, ErrorHandler_1.handleError)(err);
        res.json({
            status: "error",
            error: errorMessage,
        });
    }
});
exports.signin = signin;
