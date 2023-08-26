"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const config_1 = __importDefault(require("./config"));
const pool = new pg_1.Pool({
    user: config_1.default.DBUSERNAME,
    password: config_1.default.DBPASSWORD,
    host: config_1.default.DBHOST,
    port: config_1.default.DBPORT,
    database: config_1.default.DBNAME,
});
exports.default = pool;
