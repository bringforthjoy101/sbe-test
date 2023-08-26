"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// routes
const routes_1 = __importDefault(require("./routes"));
// load the WSDL file
const server = () => {
    const app = (0, express_1.default)();
    // PARSE JSON
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    // ENABLE CORS AND START SERVER
    app.use((0, cors_1.default)({ origin: true }));
    // Routes
    app.use(routes_1.default);
    return app;
};
exports.default = server;
