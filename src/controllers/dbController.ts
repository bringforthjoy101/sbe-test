import { DBService } from '../services';
import { errorResponse, getRandom, successResponse } from '../utils';
import { Request, Response } from 'express';
import { FnResponseDataType } from '../types';

export class DBController {
	private db: DBService;

	constructor() {
		this.db = new DBService();
	}

	public upTables = async (req: Request, res: Response) => {
		try {
			const tables: FnResponseDataType = await this.db.createTables();
			if (!tables.status) return errorResponse(res, tables.message);
			return successResponse(res, tables.message, tables.data);
		} catch (error) {
			console.log(error);
			return errorResponse(res, `An error occurred:- ${error}`);
		}
	};

	public downTables = async (req: Request, res: Response) => {
		try {
			const tables: FnResponseDataType = await this.db.dropTables();
			if (!tables.status) return errorResponse(res, tables.message);
			return successResponse(res, tables.message, tables.data);
		} catch (error) {
			console.log(error);
			return errorResponse(res, `An error occurred:- ${error}`);
		}
	};
}
