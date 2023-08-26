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
exports.PostController = void 0;
const utils_1 = require("../utils");
const types_1 = require("../types");
const services_1 = require("../services");
class PostController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { title, content } = req.body;
            const { id } = req.params;
            try {
                const post = yield this.postsService.createPost({ title, content, userId: id });
                if (!post.status)
                    return (0, utils_1.errorResponse)(res, post.message);
                return (0, utils_1.successResponse)(res, post.message, post.data);
            }
            catch (error) {
                console.log(error);
                return (0, utils_1.errorResponse)(res, types_1.ResponseMSG.ERROR.replace('{error}', `${error}`));
            }
        });
        this.retrieve = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const posts = yield this.postsService.getUserPosts(id);
                if (!posts.status)
                    return (0, utils_1.errorResponse)(res, posts.message);
                return (0, utils_1.successResponse)(res, posts.message, posts.data);
            }
            catch (error) {
                console.log(error);
                return (0, utils_1.errorResponse)(res, types_1.ResponseMSG.ERROR.replace('{error}', `${error}`));
            }
        });
        this.postsService = new services_1.PostsService();
    }
}
exports.PostController = PostController;
