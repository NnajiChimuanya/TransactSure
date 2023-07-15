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
exports.getTransactions = exports.sendFunds = exports.searchById = exports.deleteId = exports.generateNewId = void 0;
const UserModel_1 = __importDefault(require("../model/UserModel"));
const TransactionModel_1 = __importDefault(require("../model/TransactionModel"));
const ErrorHandler_1 = require("../utils/ErrorHandler");
const paymentIdGenerator_1 = require("../utils/paymentIdGenerator");
const generateNewId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let client = yield UserModel_1.default.findOne({ email });
    try {
        if (client) {
            if (password === (client === null || client === void 0 ? void 0 : client.password)) {
                if (client.paymentId.length <= 4) {
                    let newId = yield (0, paymentIdGenerator_1.paymentIdGenerator)();
                    client.paymentId.push(newId);
                    client
                        .save()
                        .then((data) => res.json({
                        status: "success",
                        paymentId: client === null || client === void 0 ? void 0 : client.paymentId,
                    }))
                        .catch((err) => {
                        let error = (0, ErrorHandler_1.handleError)(err);
                        res.json(error);
                    });
                }
                else {
                    res.json({
                        status: "error",
                        error: "Maximum amount of Payment Id created",
                    });
                }
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
exports.generateNewId = generateNewId;
const deleteId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, id } = req.body;
    let client = yield UserModel_1.default.findOne({ email });
    try {
        if (client) {
            if (password === (client === null || client === void 0 ? void 0 : client.password)) {
                if (client.paymentId.length > 1) {
                    let indexOfId = client.paymentId.indexOf(id);
                    console.log(indexOfId);
                    if (indexOfId >= 0) {
                        let popped = client.paymentId.splice(indexOfId, 1);
                        console.log(client.paymentId);
                        client
                            .save()
                            .then((data) => res.json({
                            status: "success",
                            paymentId: data === null || data === void 0 ? void 0 : data.paymentId,
                        }))
                            .catch((err) => {
                            let errorMessage = (0, ErrorHandler_1.handleError)(err);
                            res.json({
                                status: "error",
                                error: errorMessage,
                            });
                        });
                    }
                    else {
                        throw Error("Id does not exist");
                    }
                }
                else {
                    res.json({
                        status: "error",
                        error: "Minimum 1 payment Id required",
                    });
                }
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
exports.deleteId = deleteId;
const searchById = (req, res) => {
    const { id } = req.body;
    UserModel_1.default
        .findOne({
        paymentId: {
            $in: [id],
        },
    })
        .then((data) => {
        if (data) {
            res.json({
                status: "success",
                data: data,
            });
        }
        else {
            res.json({
                status: "error",
                error: "User not found",
            });
        }
    })
        .catch((err) => {
        let errorMessage = (0, ErrorHandler_1.handleError)(err);
        res.json({
            status: "error",
            error: errorMessage,
        });
    });
};
exports.searchById = searchById;
const sendFunds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password, recipientId, amount } = req.body;
    amount = Number(amount);
    let client = yield UserModel_1.default.findOne({ email });
    try {
        if (client) {
            if (password === (client === null || client === void 0 ? void 0 : client.password)) {
                client.balance = Number(client.balance);
                if (client.balance >= amount) {
                    //Searching for the recipient Id
                    let recipient = yield UserModel_1.default.findOne({
                        paymentId: { $in: [recipientId] },
                    });
                    if (recipient) {
                        recipient.balance = Number(recipient.balance);
                        //Ensuring the there is no self tranfers
                        if (recipient.email !== client.email) {
                            client.balance = client.balance - amount;
                            recipient.balance = recipient.balance + amount;
                            client
                                .save()
                                .then((data) => {
                                //   console.log(`${data.email} sent ${amount} to ${recipientId}`);
                            })
                                .catch((err) => {
                                let errorMessage = (0, ErrorHandler_1.handleError)(err);
                                res.json({
                                    status: "failed",
                                    error: errorMessage,
                                });
                            });
                            try {
                                recipient
                                    .save()
                                    .then((data) => {
                                    // console.log(
                                    //   `${recipientId} has recieved ${amount} from ${email}`
                                    // );
                                })
                                    .catch((err) => {
                                    let errorMessage = (0, ErrorHandler_1.handleError)(err);
                                    res.json({
                                        status: "failed",
                                        error: errorMessage,
                                    });
                                });
                                //Creating the transaction history
                                let newTransaction = yield TransactionModel_1.default.create({
                                    emails: [client.email, recipient.email],
                                    senderEmail: client.email,
                                    recieverEmail: recipient.email,
                                    recieverId: recipientId,
                                    amount: amount,
                                    dateOfTransaction: new Date().toUTCString(),
                                });
                                res.json({
                                    status: "success",
                                    message: "Transaction successful",
                                    balance: client.balance,
                                });
                            }
                            catch (err) {
                                //Reverting the transaction if anything went wrong
                                client.balance = client.balance + amount;
                                client.save();
                                let errorMessage = (0, ErrorHandler_1.handleError)(err);
                                res.json({
                                    status: "failed",
                                    error: errorMessage,
                                });
                            }
                        }
                        else {
                            res.json({
                                status: "failed",
                                error: "Self transfer detected",
                            });
                        }
                    }
                    else {
                        res.json({
                            status: "error",
                            error: "User not found",
                        });
                    }
                }
                else {
                    throw Error("Insufficient funds");
                }
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
exports.sendFunds = sendFunds;
const getTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let client = yield UserModel_1.default.findOne({ email });
    try {
        if (client) {
            if (password === (client === null || client === void 0 ? void 0 : client.password)) {
                let transactionHistory = yield TransactionModel_1.default.find({
                    emails: { $in: [email] },
                });
                if (transactionHistory) {
                    res.json({
                        status: "success",
                        data: transactionHistory,
                    });
                }
                else {
                    res.json({
                        status: "failed",
                        error: "couldnt fetch transactions",
                    });
                }
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
exports.getTransactions = getTransactions;
