import { fnResponse } from '../utils';
import { DBTables, FnResponseDataType, ResponseMSG } from '../types';
import { DBService } from './db';

interface createUser {
	name: string;
	email: string;
}

export class UsersService {
	private db: DBService;

	constructor() {
		this.db = new DBService();
	}

	public createUser = async (userData: createUser): Promise<FnResponseDataType> => {
		const { email, name } = userData;
		try {
			const userExists = await this.db.selectSQL(DBTables.USERS, { email });
			console.log({ userExists });
			if (userExists.status && userExists.data.length)
				return fnResponse({
					status: false,
					message: ResponseMSG.RECORD_EXISTS.replace('{model}', DBTables.USERS),
				});

			await this.db.insertSQL(DBTables.USERS, { name, email });
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

	public getUsers = async (): Promise<FnResponseDataType> => {
		try {
			const userExists = await this.db.selectSQL(DBTables.USERS);
			if (!userExists.status)
				return fnResponse({
					status: false,
					message: userExists.message,
				});

			return fnResponse({
				status: true,
				message: ResponseMSG.SUCCESS,
				data: userExists.data,
			});
		} catch (error) {
			return fnResponse({
				status: false,
				message: ResponseMSG.ERROR.replace('{error}', `${error}`),
			});
		}
	};

	public getTopUsers = async (): Promise<FnResponseDataType> => {
		try {
			const query = `SELECT users.id, users.name, posts.title, comments.content
FROM users
LEFT JOIN posts ON users.id = posts.userId
LEFT JOIN comments ON posts.id = comments.postId
WHERE comments.createdAt = (SELECT MAX(createdAt) FROM comments WHERE postId = posts.id)
ORDER BY (SELECT COUNT(posts.id) FROM posts WHERE posts.userId = users.id) DESC
LIMIT 3;`;

			const query2: string = `WITH LatestComment AS (
					SELECT postId, MAX(createdAt) AS latestCommentDate
					FROM comments
					GROUP BY postId
			)
			
			SELECT u.id, u.name, p.title, c.content AS comment_content
			FROM users u
			LEFT JOIN posts p ON u.id = p.userId
			LEFT JOIN LatestComment lc ON p.id = lc.postId
			LEFT JOIN comments c ON p.id = c.postId AND lc.latestCommentDate = c.createdAt
			ORDER BY (
					SELECT COUNT(p2.id)
					FROM posts p2
					WHERE p2.userId = u.id
			) DESC
			LIMIT 3;`;
			const userExists = await this.db.rawSQL(query);
			if (!userExists.status)
				return fnResponse({
					status: false,
					message: userExists.message,
				});

			return fnResponse({
				status: true,
				message: ResponseMSG.SUCCESS,
				data: userExists.data,
			});
		} catch (error) {
			return fnResponse({
				status: false,
				message: ResponseMSG.ERROR.replace('{error}', `${error}`),
			});
		}
	};
}
