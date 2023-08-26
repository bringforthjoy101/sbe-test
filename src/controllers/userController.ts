import { errorResponse, successResponse } from '../utils';
import { Request, Response } from 'express';
import { FnResponseDataType, ResponseMSG } from '../types';
import { UsersService } from '../services';
import { Result, ValidationError, validationResult } from 'express-validator';

export class UserController {
	private usersService: UsersService;

	constructor() {
		this.usersService = new UsersService();
	}

	public create = async (req: Request, res: Response) => {
		const errors: Result<ValidationError> = validationResult(req);
		if (!errors.isEmpty()) return errorResponse(res, 'Validation Error', errors.array());
		const { email, name } = req.body;
		try {
			const user: FnResponseDataType = await this.usersService.createUser({ email, name });
			if (!user.status) return errorResponse(res, user.message);
			return successResponse(res, user.message, user.data);
		} catch (error) {
			console.log(error);
			return errorResponse(res, ResponseMSG.ERROR.replace('{error}', `${error}`));
		}
	};

	public retrieve = async (req: Request, res: Response) => {
		try {
			const users: FnResponseDataType = await this.usersService.getUsers();
			if (!users.status) return errorResponse(res, users.message);
			return successResponse(res, users.message, users.data);
		} catch (error) {
			console.log(error);
			return errorResponse(res, ResponseMSG.ERROR.replace('{error}', `${error}`));
		}
	};

	public getTopUsers = async (req: Request, res: Response) => {
		try {
			const users: FnResponseDataType = await this.usersService.getTopUsers();
			if (!users.status) return errorResponse(res, users.message);
			return successResponse(res, users.message, users.data);
		} catch (error) {
			console.log(error);
			return errorResponse(res, ResponseMSG.ERROR.replace('{error}', `${error}`));
		}
	};
}
