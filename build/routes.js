"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import packages
const express_1 = require("express");
const config_1 = __importDefault(require("./config"));
const validate_1 = __importDefault(require("./validate"));
const controllers_1 = require("./controllers");
const types_1 = require("./types");
const postController_1 = require("./controllers/postController");
const commentController_1 = require("./controllers/commentController");
// Import function files
const routes = (0, express_1.Router)();
const dbController = new controllers_1.DBController();
const userController = new controllers_1.UserController();
const postController = new postController_1.PostController();
const commentController = new commentController_1.CommentController();
/*************************************************************************
API CALL START
 *************************************************************************/
// INDEX ROUTE TO SHOW API IS WORKING FINE
routes.get('/', (req, res) => {
    console.log(config_1.default.DBPORT);
    return res.status(200).send('API Working');
});
routes.get(types_1.Routes.UP_DB, dbController.upTables);
routes.get(types_1.Routes.DOWN_DB, dbController.downTables);
routes.post(types_1.Routes.USERS, (0, validate_1.default)(types_1.Routes.USERS), userController.create);
routes.get(types_1.Routes.USERS, userController.retrieve);
routes.post(types_1.Routes.POSTS, (0, validate_1.default)(types_1.Routes.POSTS), postController.create);
routes.get(types_1.Routes.POSTS, postController.retrieve);
routes.post(types_1.Routes.COMMENTS, (0, validate_1.default)(types_1.Routes.COMMENTS), commentController.create);
exports.default = routes;
