import { body, param, ValidationChain } from 'express-validator';
import { Routes } from './types';

const validate = (method: string): any => {
	switch (method) {
		case Routes.USERS: {
			return [
				body('name').not().isEmpty().isString().withMessage('name is required!'),
				body('email').not().isEmpty().isString().withMessage('email is required!'),
			];
		}

		case Routes.POSTS: {
			const arr: ValidationChain[] = [
				body('title').not().isEmpty().isString().withMessage('title is required!'),
				body('content').not().isEmpty().isString().withMessage('content is required!'),
			];
			if (Routes.POSTS.includes(':id')) arr.push(param('id').isInt().withMessage('ID must be a number!'));
			return arr;
		}

		case Routes.COMMENTS: {
			const arr: ValidationChain[] = [body('content').not().isEmpty().isString().withMessage('content is required!')];
			if (Routes.POSTS.includes(':postId')) arr.push(param('id').isInt().withMessage('ID must be a number!'));
			return arr;
		}
	}
};

export default validate;
