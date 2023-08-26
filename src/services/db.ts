import { fnResponse, GenerateID, getRandom } from '../utils';
import { DBTables, FnResponseDataType } from '../types';
import pool from '../pool';
import { QueryResult } from 'pg';

export class DBService {
	public createTables = async (): Promise<FnResponseDataType> => {
		try {
			const usersSQL: string = `CREATE TABLE IF NOT EXISTS users (
				id SERIAL PRIMARY KEY,
				name VARCHAR(255),
				email VARCHAR(255) UNIQUE,
				createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			);`;
			const postsSQL: string = `CREATE TABLE IF NOT EXISTS posts (
				id SERIAL PRIMARY KEY,
				userId INT,
				title VARCHAR(255),
				content TEXT,
				createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				FOREIGN KEY (userId) REFERENCES users(id)
			);`;
			const commentsSQL: string = `CREATE TABLE IF NOT EXISTS comments (
				id SERIAL PRIMARY KEY,
				postId INT,
				content TEXT,
				createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				FOREIGN KEY (postId) REFERENCES posts(id)
			);`;

			const indexes: string = `
			CREATE INDEX idxPostsUserId ON posts(userId);
			CREATE INDEX idxCommentsPostId ON comments(postId);
			`;

			await pool.query(usersSQL);
			await pool.query(postsSQL);
			await pool.query(commentsSQL);
			await pool.query(indexes);

			return fnResponse({
				status: true,
				message: 'Tables created successfully',
			});
		} catch (error) {
			console.log(error);
			return fnResponse({
				status: false,
				message: `An error occurred:- ${error}`,
			});
		}
	};

	public dropTables = async (): Promise<FnResponseDataType> => {
		try {
			await pool.query(`DROP TABLE IF EXISTS comments`);
			await pool.query(`DROP TABLE IF EXISTS posts;`);
			await pool.query(`DROP TABLE IF EXISTS users;`);

			return fnResponse({
				status: true,
				message: 'Tables dropped successfully',
			});
		} catch (error) {
			return fnResponse({
				status: false,
				message: `An error occurred:- ${error}`,
			});
		}
	};

	public selectSQL = async (table: DBTables, object?: any): Promise<FnResponseDataType> => {
		console.log({ object });
		let text: string = `SELECT * FROM ${table}`;
		const query: { text: string; values?: string[] } = { text };

		if (object) {
			const columns: string[] = Object.keys(object);
			const values: string[] = Object.values(object);
			for (let i: number = 1; i <= columns.length; i++) {
				if (i === 1) {
					text += ` WHERE ${columns[i - 1]} = $1`;
				} else {
					text += ` AND ${columns[i - 1]} = $${i}`;
				}
			}
			query.text = text;
			query.values = values;
		}

		console.log({ query });
		try {
			const res: QueryResult<any> = await pool.query(query);

			return fnResponse({
				status: true,
				message: 'Success',
				data: res.rows,
			});
		} catch (error) {
			console.log(error);
			return fnResponse({
				status: false,
				message: `An error occurred:- ${error}`,
			});
		}
	};

	public insertSQL = async (table: DBTables, object: any): Promise<FnResponseDataType> => {
		const columns: string[] = Object.keys(object);
		const values: string[] = Object.values(object);
		const prepValues: string[] = [];
		console.log(values.length);
		for (let i: number = 1; i <= values.length; i++) {
			prepValues.push(`$${i}`);
		}

		const text: string = `INSERT INTO ${table}(${columns.join(',')}) VALUES(${prepValues.join(',')})`;
		const query: { text: string; values: string[] } = { text, values };

		console.log({ query });

		try {
			const res: QueryResult<any> = await pool.query(query);
			return fnResponse({
				status: true,
				message: 'Success',
				data: res.rows[0],
			});
		} catch (error) {
			console.log(error);
			return fnResponse({
				status: false,
				message: `An error occurred:- ${error}`,
			});
		}
	};

	public updateSQL = async (table: DBTables, updateObject: any, where?: any): Promise<FnResponseDataType> => {
		const columns: string[] = Object.keys(updateObject);
		const values: string[] = Object.values(updateObject);
		const prepValues: string[] = [];

		let text: string = `UPDATE ${table} SET`;
		for (let i: number = 0; i <= columns.length; i++) {
			text += ` ${columns[i]} = ${values[i]}`;
		}
		const query: { text: string; values?: string[] } = { text };

		if (where) {
			const whereColumns: string[] = Object.keys(where);
			const whereValues: string[] = Object.values(where);
			for (let i: number = 0; i <= whereColumns.length; i++) {
				if (i === 0) {
					text += ` WHERE ${whereColumns} = $1`;
				} else {
					text += `AND ${whereColumns} = $${i + 1}`;
				}
			}
			query.values = whereValues;
		}

		console.log({ query });

		try {
			const res: QueryResult<any> = await pool.query(query);
			return fnResponse({
				status: true,
				message: 'Success',
				data: res.rows[0],
			});
		} catch (error) {
			console.log(error);
			return fnResponse({
				status: false,
				message: `An error occurred:- ${error}`,
			});
		}
	};

	public deleteSQL = async (table: DBTables, object: any): Promise<FnResponseDataType> => {
		let text: string = `DELETE FROM ${table}`;
		const query: { text: string; values?: string[] } = { text };

		if (object) {
			const columns: string[] = Object.keys(object);
			const values: string[] = Object.values(object);
			for (let i: number = 0; i <= columns.length; i++) {
				if (i === 0) {
					text += ` WHERE ${columns[i]} = $1`;
				} else {
					text += `AND ${columns[i]} = $${i + 1}`;
				}
			}

			query.values = values;
		}

		console.log({ query });
		try {
			const res: QueryResult<any> = await pool.query(query);

			return fnResponse({
				status: true,
				message: 'Success',
				data: res.rows[0],
			});
		} catch (error) {
			console.log(error);
			return fnResponse({
				status: false,
				message: `An error occurred:- ${error}`,
			});
		}
	};

	public rawSQL = async (query: string): Promise<FnResponseDataType> => {
		try {
			const res: QueryResult<any> = await pool.query(query);

			return fnResponse({
				status: true,
				message: 'Success',
				data: res.rows[0],
			});
		} catch (error) {
			console.log(error);
			return fnResponse({
				status: false,
				message: `An error occurred:- ${error}`,
			});
		}
	};
}
