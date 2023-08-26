import { fnResponse } from '../utils';
import { DBTables, FnResponseDataType, ResponseMSG } from '../types';
import { DBService } from './db';

interface createPost {
	title: string;
	content: string;
	userId: string;
}

export class PostsService {
	private db: DBService;

	constructor() {
		this.db = new DBService();
	}

	public createPost = async (postData: createPost): Promise<FnResponseDataType> => {
		const { title, content, userId } = postData;
		try {
			const userExists = await this.db.selectSQL(DBTables.USERS, { id: userId });
			if (userExists.status && !userExists.data.length)
				return fnResponse({
					status: false,
					message: ResponseMSG.RECORD_NOT_FOUND.replace('{model}', DBTables.USERS),
				});

			await this.db.insertSQL(DBTables.POSTS, { title, content, userId });

			return fnResponse({
				status: true,
				message: ResponseMSG.SUCCESS,
			});
		} catch (error) {
			return fnResponse({
				status: false,
				message: ResponseMSG.ERROR.replace('{error}', `${error}`),
			});
		}
	};

	public getUserPosts = async (userId: string): Promise<FnResponseDataType> => {
		try {
			const userExists = await this.db.selectSQL(DBTables.USERS, { id: userId });
			if (userExists.status && !userExists.data.length)
				return fnResponse({
					status: false,
					message: ResponseMSG.RECORD_NOT_FOUND.replace('{model}', DBTables.USERS),
				});

			const postExists = await this.db.selectSQL(DBTables.POSTS, { userId });
			if (!postExists.status)
				return fnResponse({
					status: false,
					message: postExists.message,
				});

			return fnResponse({
				status: true,
				message: ResponseMSG.SUCCESS,
				data: postExists.data,
			});
		} catch (error) {
			return fnResponse({
				status: false,
				message: ResponseMSG.ERROR.replace('{error}', `${error}`),
			});
		}
	};
}
