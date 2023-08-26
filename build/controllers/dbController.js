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
exports.DBController = void 0;
const services_1 = require("../services");
const utils_1 = require("../utils");
class DBController {
    constructor() {
        this.upTables = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tables = yield this.db.createTables();
                if (!tables.status)
                    return (0, utils_1.errorResponse)(res, tables.message);
                return (0, utils_1.successResponse)(res, tables.message, tables.data);
            }
            catch (error) {
                console.log(error);
                return (0, utils_1.errorResponse)(res, `An error occurred:- ${error}`);
            }
        });
        this.downTables = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tables = yield this.db.dropTables();
                if (!tables.status)
                    return (0, utils_1.errorResponse)(res, tables.message);
                return (0, utils_1.successResponse)(res, tables.message, tables.data);
            }
            catch (error) {
                console.log(error);
                return (0, utils_1.errorResponse)(res, `An error occurred:- ${error}`);
            }
        });
        this.db = new services_1.DBService();
    }
}
exports.DBController = DBController;
