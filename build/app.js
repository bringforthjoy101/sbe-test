"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const server_1 = __importDefault(require("./server"));
const app = (0, server_1.default)();
app.listen(config_1.default.PORT, () => {
    console.log(`Server started on port ${config_1.default.PORT}`);
});
