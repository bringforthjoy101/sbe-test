import { fnResponse } from '../utils';
import { DBTables, FnResponseDataType, ResponseMSG } from '../types';
import { DBService } from './db';

interface createComment {
	content: string;
	postId: string;
}

export class CommentsService {
	private db: DBService;

	constructor() {
		this.db = new DBService();
	}

	public createComment = async (postData: createComment): Promise<FnResponseDataType> => {
		const { content, postId } = postData;
		try {
			const postExists: FnResponseDataType = await this.db.selectSQL(DBTables.POSTS, { id: postId });
			if (postExists.status && !postExists.data.length)
				return fnResponse({
					status: false,
					message: ResponseMSG.RECORD_NOT_FOUND.replace('{model}', DBTables.POSTS),
				});
			await this.db.insertSQL(DBTables.COMMENTS, { content, postId });

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
}
