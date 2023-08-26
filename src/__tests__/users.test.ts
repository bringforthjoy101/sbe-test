import supertest from 'supertest';
import server from '../server';
import { ResponseMSG, Routes } from '../types';

const app = server();

const userInput: { email: string; name: string } = {
	email: 'adelugba.emma@gmail.com',
	name: 'Emmanuel Adelugba',
};

describe('USERS', () => {
	describe('Create user', () => {
		describe('given the name and email are valid', () => {
			it('should return the success', async () => {
				const { statusCode, body } = await supertest(app).post(Routes.USERS).send(userInput);

				console.log({ body });
				expect(statusCode).toBe(200);
				expect(body).toMatchObject({ success: true, message: ResponseMSG.SUCCESS });
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
