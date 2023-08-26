import supertest from 'supertest';
import server from '../server';
import { DBTables, ResponseMSG, Routes } from '../types';

const app = server();

const enum MockPostData {
	TITLE = 'Post 1',
	CONTENT = 'This is a post content',
	VALID_USER_ID = '1',
	INVALID_USER_ID = '1000',
}
const postInput: { title: string; content: string } = {
	title: MockPostData.TITLE,
	content: MockPostData.CONTENT,
};

describe('POSTS', () => {
	describe('CREATE Post', () => {
		describe('given the input values are valid', () => {
			it('should return success', async () => {
				const { statusCode, body } = await supertest(app).post(Routes.POSTS.replace(':id', MockPostData.VALID_USER_ID)).send(postInput);
				// console.log(Routes.POSTS.replace(':id', MockPostData.VALID_USER_ID));
				expect(statusCode).toBe(200);
				expect(body).toMatchObject({ success: true, message: ResponseMSG.SUCCESS });
			});
		});

		describe('given the input values are invalid', () => {
			it('should return error', async () => {
				const { statusCode, body } = await supertest(app)
					.post(Routes.POSTS.replace(':id', MockPostData.VALID_USER_ID))
					.send({ title: MockPostData.TITLE });
				expect(statusCode).toBe(400);
				expect(body).toMatchObject({ success: false, message: ResponseMSG.VALIDATION_ERROR });
			});
		});

		describe('given the user does not exists', () => {
			it('should return error', async () => {
				const { statusCode, body } = await supertest(app).post(Routes.POSTS.replace(':id', MockPostData.INVALID_USER_ID)).send(postInput);
				expect(statusCode).toBe(400);
				expect(body).toMatchObject({ success: false, message: ResponseMSG.RECORD_NOT_FOUND.replace('{model}', DBTables.USERS) });
			});
		});
	});

	describe(`GET POSTS`, () => {
		describe('given the userId is valid', () => {
			it('Should return success', async () => {
				const res = await supertest(app).get(Routes.POSTS.replace(':id', MockPostData.VALID_USER_ID));
				expect(res.statusCode).toBe(200);
			});
		});

		describe('given the userId is invalid', () => {
			it('Should return error', async () => {
				const { statusCode, body } = await supertest(app).get(Routes.POSTS.replace(':id', MockPostData.INVALID_USER_ID));
				expect(statusCode).toBe(400);
			});
		});
	});
});
