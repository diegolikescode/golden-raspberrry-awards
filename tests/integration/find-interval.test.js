const request = require('supertest');
const { startApp } = require('../../src/app');
const { bulkMoviesData } = require('../../src/config/sqlite');

describe('find Interval: Movies Controller', () => {
    let app;

    beforeAll(() => {
        process.argv.push('movielist.csv');
        bulkMoviesData();
    });

    beforeEach(() => {
        app = startApp(3333);
    });

    afterEach((done) => {
        app.close(done);
    });

    it('should return 200 and find the max and min interval between movie awards', async () => {
        const res = await request(app).get('/api/movies/find-interval');

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            max: [
                {
                    producer: 'Matthew Vaughn',
                    interval: 13,
                    previousWin: 2002,
                    followingWin: 2015,
                },
            ],
            min: [
                {
                    producer: 'Joel Silver',
                    interval: 1,
                    previousWin: 1990,
                    followingWin: 1991,
                },
            ],
        });
    });
});
