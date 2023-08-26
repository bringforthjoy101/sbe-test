import supertest from 'supertest';
import server from '../server';

const app = server();

describe('Test app.ts', () => {
	test('Catch-all route', async () => {
		const res = await supertest(app).get('/');
		expect(res.statusCode).toBe(200);
		expect(res.text).toEqual('API Working');
	});
});
