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
exports.resolversUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const md5_1 = __importDefault(require("md5"));
exports.resolversUser = {
    Query: {
        getUser: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (context["user"].token) {
                const user = yield user_model_1.default.findOne({ token: context["user"].token, deleted: false });
                if (user) {
                    return {
                        code: 200,
                        message: "Thanh cong",
                        id: user.id,
                        fullName: user.fullName,
                        email: user.email,
                        token: user.token
                    };
                }
            }
            return {
                code: 400,
                message: "That bai"
            };
        })
    },
    Mutation: {
        registerUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = args;
            const existEmail = yield user_model_1.default.findOne({ email: user.email });
            if (existEmail) {
                return {
                    code: 400,
                    message: "email da ton tai"
                };
            }
            user.password = (0, md5_1.default)(user.password);
            const record = new user_model_1.default(user);
            yield record.save();
            return {
                code: 200,
                message: "dang ky thanh cong",
                id: record.id,
                fullName: record.fullName,
                email: record.email,
                token: record.token
            };
        }),
        loginUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { email, password } = args.user;
            const existUser = yield user_model_1.default.findOne({ deleted: false, email: email });
            if (!existUser) {
                return {
                    code: 400,
                    message: "Email khong ton tai"
                };
            }
            if (existUser.password != (0, md5_1.default)(password)) {
                return {
                    code: 400,
                    message: "Sai mat khau"
                };
            }
            return {
                code: 200,
                message: "Dang nhap thanh cong",
                fullName: existUser.fullName,
                email: existUser.fullName,
                token: existUser.token
            };
        })
    }
};
