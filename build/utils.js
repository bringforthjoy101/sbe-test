"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandom = exports.GenerateID = exports.fnResponse = exports.errorResponse = exports.successResponse = exports.handleResponse = void 0;
const handleResponse = (res, statusCode, status, message, data) => {
    return res.status(statusCode).json({
        status,
        message,
        data,
    });
};
exports.handleResponse = handleResponse;
const successResponse = (res, message = 'Operation successful', data) => {
    return res.status(200).json({
        success: true,
        message,
        data,
    });
};
exports.successResponse = successResponse;
const errorResponse = (res, message = 'An error occurred', data) => {
    return res.status(400).json({
        success: false,
        message,
        data,
    });
};
exports.errorResponse = errorResponse;
const fnResponse = ({ status, message, data }) => {
    return { status, message, data };
};
exports.fnResponse = fnResponse;
function GenerateID(prefix) {
    const randomDigits = Array(8)
        .fill(0)
        .map((e, i) => (e = (Math.random() * 10) | 0));
    return prefix + randomDigits.join('');
}
exports.GenerateID = GenerateID;
const getRandom = (length) => Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
exports.getRandom = getRandom;
