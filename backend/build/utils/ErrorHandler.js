"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (err) => {
    let error = "An error occurred";
    if (err.code === 11000) {
        error = "Email already exists";
    }
    if (err.message.includes("name required")) {
        error = "please enter Name";
    }
    if (err.message.includes("Email required")) {
        error = "please enter Email";
    }
    if (err.message.includes("Phone number required")) {
        error = "please enter Phone number";
    }
    if (err.message.includes("Password required")) {
        error = "please enter Password";
    }
    if (err.message === "Email not found") {
        error = "email does not exist";
    }
    if (err.message === "Invalid password") {
        error = "Invalid password";
    }
    if (err.message.includes("Maximum of 5 payIds and minimum of 1 allowed")) {
        error = "Maximum of 5 payIds and minimum of 1 allowed";
    }
    if (err.message === "Id does not exist") {
        error = "Id does not exist";
    }
    if (err.message === "Insufficient funds") {
        error = "Insufficient funds";
    }
    return error;
};
exports.handleError = handleError;
