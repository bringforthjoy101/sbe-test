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
exports.DBService = void 0;
const utils_1 = require("../utils");
const pool_1 = __importDefault(require("../pool"));
class DBService {
    constructor() {
        this.createTables = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const usersSQL = `CREATE TABLE IF NOT EXISTS users (
				id INT PRIMARY KEY,
				name VARCHAR(255),
				email VARCHAR(255) UNIQUE,
				createdAt TIMESTAMP
			);`;
                const postsSQL = `CREATE TABLE IF NOT EXISTS posts (
				id INT PRIMARY KEY,
				userId INT,
				title VARCHAR(255),
				content TEXT,
				createdAt TIMESTAMP,
				FOREIGN KEY (userId) REFERENCES users(id)
			);`;
                const commentsSQL = `CREATE TABLE IF NOT EXISTS comments (
				id INT PRIMARY KEY,
				postId INT,
				content TEXT,
				createdAt TIMESTAMP,
				FOREIGN KEY (postId) REFERENCES posts(id)
			);`;
                const indexes = `
			CREATE INDEX idxPostsUserId ON posts(userId);
			CREATE INDEX idxCommentsPostId ON comments(postId);
			`;
                yield pool_1.default.query(usersSQL);
                yield pool_1.default.query(postsSQL);
                yield pool_1.default.query(commentsSQL);
                yield pool_1.default.query(indexes);
                return (0, utils_1.fnResponse)({
                    status: true,
                    message: 'Tables created successfully',
                });
            }
            catch (error) {
                console.log(error);
                return (0, utils_1.fnResponse)({
                    status: false,
                    message: `An error occurred:- ${error}`,
                });
            }
        });
        this.dropTables = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield pool_1.default.query(`DROP TABLE IF EXISTS comments`);
                yield pool_1.default.query(`DROP TABLE IF EXISTS posts;`);
                yield pool_1.default.query(`DROP TABLE IF EXISTS users;`);
                return (0, utils_1.fnResponse)({
                    status: true,
                    message: 'Tables dropped successfully',
                });
            }
            catch (error) {
                return (0, utils_1.fnResponse)({
                    status: false,
                    message: `An error occurred:- ${error}`,
                });
            }
        });
        this.selectSQL = (table, object) => __awaiter(this, void 0, void 0, function* () {
            let text = `SELECT * FROM ${table}`;
            const query = { text };
            if (object) {
                const columns = Object.keys(object);
                const values = Object.values(object);
                columns.forEach((column, key) => {
                    if (key === 0) {
                        text += ` WHERE ${column} = $1`;
                    }
                    else {
                        text += `AND ${column} = $${key + 1}`;
                    }
                });
                query.values = values;
            }
            console.log({ query });
            try {
                const res = yield pool_1.default.query(query);
                return (0, utils_1.fnResponse)({
                    status: true,
                    message: 'Success',
                    data: res.rows[0],
                });
            }
            catch (error) {
                console.log(error);
                return (0, utils_1.fnResponse)({
                    status: false,
                    message: `An error occurred:- ${error}`,
                });
            }
        });
        this.insertSQL = (table, object) => __awaiter(this, void 0, void 0, function* () {
            const columns = Object.keys(object);
            const values = Object.values(object);
            const prepValues = [];
            for (let i = 0; i <= values.length; i++) {
                prepValues.push(`$${i}`);
            }
            const text = `INSERT INTO ${table}(${columns.join(',')}) VALUES(${prepValues.join(',')})`;
            const query = { text, values };
            console.log({ query });
            try {
                const res = yield pool_1.default.query(query);
                return (0, utils_1.fnResponse)({
                    status: true,
                    message: 'Success',
                    data: res.rows[0],
                });
            }
            catch (error) {
                console.log(error);
                return (0, utils_1.fnResponse)({
                    status: false,
                    message: `An error occurred:- ${error}`,
                });
            }
        });
        this.updateSQL = (table, updateObject, where) => __awaiter(this, void 0, void 0, function* () {
            const columns = Object.keys(updateObject);
            const values = Object.values(updateObject);
            const prepValues = [];
            let text = `UPDATE ${table} SET`;
            for (let i = 0; i <= columns.length; i++) {
                text += ` ${columns[i]} = ${values[i]}`;
            }
            const query = { text };
            if (where) {
                const whereColumns = Object.keys(where);
                const whereValues = Object.values(where);
                for (let i = 0; i <= whereColumns.length; i++) {
                    if (i === 0) {
                        text += ` WHERE ${whereColumns} = $1`;
                    }
                    else {
                        text += `AND ${whereColumns} = $${i + 1}`;
                    }
                }
                query.values = whereValues;
            }
            console.log({ query });
            try {
                const res = yield pool_1.default.query(query);
                return (0, utils_1.fnResponse)({
                    status: true,
                    message: 'Success',
                    data: res.rows[0],
                });
            }
            catch (error) {
                console.log(error);
                return (0, utils_1.fnResponse)({
                    status: false,
                    message: `An error occurred:- ${error}`,
                });
            }
        });
        this.deleteSQL = (table, object) => __awaiter(this, void 0, void 0, function* () {
            let text = `DELETE FROM ${table}`;
            const query = { text };
            if (object) {
                const columns = Object.keys(object);
                const values = Object.values(object);
                for (let i = 0; i <= columns.length; i++) {
                    if (i === 0) {
                        text += ` WHERE ${columns[i]} = $1`;
                    }
                    else {
                        text += `AND ${columns[i]} = $${i + 1}`;
                    }
                }
                query.values = values;
            }
            console.log({ query });
            try {
                const res = yield pool_1.default.query(query);
                return (0, utils_1.fnResponse)({
                    status: true,
                    message: 'Success',
                    data: res.rows[0],
                });
            }
            catch (error) {
                console.log(error);
                return (0, utils_1.fnResponse)({
                    status: false,
                    message: `An error occurred:- ${error}`,
                });
            }
        });
        this.rawSQL = (query) => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield pool_1.default.query(query);
                return (0, utils_1.fnResponse)({
                    status: true,
                    message: 'Success',
                    data: res.rows[0],
                });
            }
            catch (error) {
                console.log(error);
                return (0, utils_1.fnResponse)({
                    status: false,
                    message: `An error occurred:- ${error}`,
                });
            }
        });
    }
}
exports.DBService = DBService;
