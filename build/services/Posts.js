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
exports.PostsService = void 0;
const utils_1 = require("../utils");
const types_1 = require("../types");
const db_1 = require("./db");
class PostsService {
    constructor() {
        this.createPost = (postData) => __awaiter(this, void 0, void 0, function* () {
            const { title, content, userId } = postData;
            try {
                const postExists = yield this.db.selectSQL(types_1.DBTables.POSTS, { title, userId });
                if (postExists.status)
                    return (0, utils_1.fnResponse)({
                        status: false,
                        message: types_1.ResponseMSG.RECORD_EXISTS.replace('{model}', types_1.DBTables.POSTS),
                    });
                yield this.db.insertSQL(types_1.DBTables.USERS, { title, content, userId });
                return (0, utils_1.fnResponse)({
                    status: true,
                    message: types_1.ResponseMSG.SUCCESS,
                });
            }
            catch (error) {
                return (0, utils_1.fnResponse)({
                    status: false,
                    message: types_1.ResponseMSG.ERROR.replace('{error}', `${error}`),
                });
            }
        });
        this.getUserPosts = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const postExists = yield this.db.selectSQL(types_1.DBTables.POSTS, { userId });
                if (!postExists.status)
                    return (0, utils_1.fnResponse)({
                        status: false,
                        message: postExists.message,
                    });
                return (0, utils_1.fnResponse)({
                    status: true,
                    message: types_1.ResponseMSG.SUCCESS,
                    data: postExists.data,
                });
            }
            catch (error) {
                return (0, utils_1.fnResponse)({
                    status: false,
                    message: types_1.ResponseMSG.ERROR.replace('{error}', `${error}`),
                });
            }
        });
        this.db = new db_1.DBService();
    }
}
exports.PostsService = PostsService;
