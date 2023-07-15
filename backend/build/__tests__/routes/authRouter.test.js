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
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default
        .connect(process.env.mongo_uri)
        .then(() => { })
        .catch((err) => console.log(err));
}));
//Sign in
describe("GET /", () => {
    it("User exists", () => __awaiter(void 0, void 0, void 0, function* () {
        let payload = {
            email: "nnajichimuanya50@gmail.com",
            password: "password",
        };
        let res = yield (0, supertest_1.default)(server_1.default).post("/auth/signin").send(payload);
        expect(res.status).toBe(200);
    }), 20000);
    it("User does not exists", () => __awaiter(void 0, void 0, void 0, function* () {
        let payload = {
            email: "nnajichi",
            password: "password",
        };
        let res = yield (0, supertest_1.default)(server_1.default).post("/auth/signin").send(payload);
        expect(res.body.error).toBe("email does not exist");
    }), 20000);
    it("User exist, invalid password", () => __awaiter(void 0, void 0, void 0, function* () {
        let payload = {
            email: "nnajichimuanya50@gmail.com",
            password: "invalidPassword",
        };
        let res = yield (0, supertest_1.default)(server_1.default).post("/auth/signin").send(payload);
        expect(res.body.status).toBe("error");
        expect(res.body.error).toBe("Invalid password");
    }), 20000);
});
//Sign in
describe("GET /", () => {
    it("Successful sign up", () => __awaiter(void 0, void 0, void 0, function* () {
        let payload = {
            name: "Nnaji Chimuanya",
            email: "nnajichimuanya@gmail.com",
            phonenUmber: "09131578808",
            password: "password",
        };
        let res = yield (0, supertest_1.default)(server_1.default).post("/auth/signup").send(payload);
        expect(res.status).toBe(200);
    }), 20000);
    it("Email already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        let payload = {
            name: "Nnaji Chimuanya",
            email: "nnajichimuanya50@gmail.com",
            phoneNumber: "09131578808",
            password: "password",
        };
        let res = yield (0, supertest_1.default)(server_1.default).post("/auth/signup").send(payload);
        expect(res.status).toBe(200);
        expect(res.body.status).toBe("error");
        expect(res.body.error).toBe("Email already exists");
    }), 20000);
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
