"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const types_1 = require("./types");
const validate = (method) => {
    switch (method) {
        case types_1.Routes.USERS: {
            return [
                (0, express_validator_1.body)('name').not().isEmpty().isString().withMessage('name is required!'),
                (0, express_validator_1.body)('email').not().isEmpty().isString().withMessage('email is required!'),
            ];
        }
        case types_1.Routes.POSTS: {
            const arr = [
                (0, express_validator_1.body)('title').not().isEmpty().isString().withMessage('title is required!'),
                (0, express_validator_1.body)('content').not().isEmpty().isString().withMessage('content is required!'),
            ];
            if (types_1.Routes.POSTS.includes(':id'))
                arr.push((0, express_validator_1.param)('id').isInt().withMessage('ID must be a number!'));
            return arr;
        }
        case types_1.Routes.COMMENTS: {
            const arr = [
                (0, express_validator_1.body)('content').not().isEmpty().isString().withMessage('content is required!'),
                (0, express_validator_1.body)('name').not().isEmpty().isString().withMessage('name is required!'),
            ];
            if (types_1.Routes.POSTS.includes(':postId'))
                arr.push((0, express_validator_1.param)('id').isInt().withMessage('ID must be a number!'));
            return arr;
        }
    }
};
exports.default = validate;
