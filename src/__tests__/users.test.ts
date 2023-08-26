import supertest from 'supertest';
import server from '../server';
import { DBTables, ResponseMSG, Routes } from '../types';

const app = server();

const enum MockUser {
	EMAIL = 'adelugba.emma@gmail.com',
	NAME = 'Emmanuel Adelugba',
}
const userInput: { email: string; name: string } = {
	email: MockUser.EMAIL,
	name: MockUser.NAME,
};

describe('USERS', () => {
	describe('Create User', () => {
		describe('given the name and email are valid', () => {
			it('should return the success', async () => {
				const { statusCode, body } = await supertest(app).post(Routes.USERS).send(userInput);
				expect(statusCode).toBe(200);
				expect(body).toMatchObject({ success: true, message: ResponseMSG.SUCCESS });
			});
		});

		describe('given the name or email are invalid inputs', () => {
			it('should return the success', async () => {
				const { statusCode, body } = await supertest(app).post(Routes.USERS).send({ email: MockUser.EMAIL });
				expect(statusCode).toBe(400);
				expect(body).toMatchObject({ success: false, message: ResponseMSG.VALIDATION_ERROR });
			});
		});

		describe('given the user exists', () => {
			it('should return the success', async () => {
				const { statusCode, body } = await supertest(app).post(Routes.USERS).send(userInput);
				expect(statusCode).toBe(400);
				expect(body).toMatchObject({ success: false, message: ResponseMSG.RECORD_EXISTS.replace('{model}', DBTables.USERS) });
			});
		});
	});

	describe(`GET Users`, () => {
		it('Get All Users', async () => {
			const res = await supertest(app).get(Routes.USERS);
			expect(res.statusCode).toBe(200);
		});
	});
});
