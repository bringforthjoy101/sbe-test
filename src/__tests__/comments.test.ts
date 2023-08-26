import supertest from 'supertest';
import server from '../server';
import { DBTables, ResponseMSG, Routes } from '../types';

const app = server();

const enum MockCommentData {
	CONTENT = 'This is a post content',
	VALID_POST_ID = '1',
	INVALID_POST_ID = '1000',
}
const commentInput: { content: string } = { content: MockCommentData.CONTENT };

describe('COMMENTS', () => {
	describe('CREATE Comment', () => {
		describe('given the input values are valid', () => {
			it('should return success', async () => {
				const { statusCode, body } = await supertest(app).post(Routes.POSTS.replace(':postId', MockCommentData.VALID_POST_ID)).send(commentInput);
				// console.log(Routes.POSTS.replace(':id', MockPostData.VALID_USER_ID));
				expect(statusCode).toBe(200);
				expect(body).toMatchObject({ success: true, message: ResponseMSG.SUCCESS });
			});
		});

		describe('given the input values are invalid', () => {
			it('should return error', async () => {
				const { statusCode, body } = await supertest(app).post(Routes.POSTS.replace(':postId', MockCommentData.VALID_POST_ID)).send();
				expect(statusCode).toBe(400);
				expect(body).toMatchObject({ success: false, message: ResponseMSG.VALIDATION_ERROR });
			});
		});

		describe('given the post does not exists', () => {
			it('should return error', async () => {
				const { statusCode, body } = await supertest(app).post(Routes.POSTS.replace(':id', MockCommentData.INVALID_POST_ID)).send(commentInput);
				expect(statusCode).toBe(400);
				expect(body).toMatchObject({ success: false, message: ResponseMSG.RECORD_NOT_FOUND.replace('{model}', DBTables.POSTS) });
			});
		});
	});
});
