"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = exports.ResponseMSG = exports.DBTables = void 0;
var DBTables;
(function (DBTables) {
    DBTables["USERS"] = "users";
    DBTables["POSTS"] = "posts";
    DBTables["COMMENTS"] = "comments";
})(DBTables || (exports.DBTables = DBTables = {}));
var ResponseMSG;
(function (ResponseMSG) {
    ResponseMSG["SUCCESS"] = "Success";
    ResponseMSG["ERROR"] = "An error occurred:- {error}";
    ResponseMSG["RECORD_EXISTS"] = "{model} already exists!";
    ResponseMSG["RECORD_NOT_FOUND"] = "{model} not found!";
})(ResponseMSG || (exports.ResponseMSG = ResponseMSG = {}));
var Routes;
(function (Routes) {
    Routes["UP_DB"] = "/up";
    Routes["DOWN_DB"] = "/down";
    Routes["USERS"] = "/users";
    Routes["POSTS"] = "/users/:id/posts";
    Routes["COMMENTS"] = "/posts/:postId/comments";
})(Routes || (exports.Routes = Routes = {}));
