import request from 'supertest';
import app from '../../src/app';

describe('API status', () => {
	test('should be online', async (done) => {
		const res = await request(app).get('/api');
		expect(res.statusCode).toBe(200);
		console.log(res);
		// expect(res.)
	});
});
