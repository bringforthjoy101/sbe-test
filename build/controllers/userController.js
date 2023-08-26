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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const utils_1 = require("../utils");
const types_1 = require("../types");
const services_1 = require("../services");
class UserController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, name } = req.body;
            try {
                const user = yield this.usersService.createUser({ email, name });
                if (!user.status)
                    return (0, utils_1.errorResponse)(res, user.message);
                return (0, utils_1.successResponse)(res, user.message, user.data);
            }
            catch (error) {
                console.log(error);
                return (0, utils_1.errorResponse)(res, types_1.ResponseMSG.ERROR.replace('{error}', `${error}`));
            }
        });
        this.retrieve = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.usersService.getUsers();
                if (!users.status)
                    return (0, utils_1.errorResponse)(res, users.message);
                return (0, utils_1.successResponse)(res, users.message, users.data);
            }
            catch (error) {
                console.log(error);
                return (0, utils_1.errorResponse)(res, types_1.ResponseMSG.ERROR.replace('{error}', `${error}`));
            }
        });
        this.usersService = new services_1.UsersService();
    }
}
exports.UserController = UserController;
