"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentIdGenerator = void 0;
const paymentIdGenerator = () => {
    return Math.random().toString(36).substring(2, 9);
};
exports.paymentIdGenerator = paymentIdGenerator;
