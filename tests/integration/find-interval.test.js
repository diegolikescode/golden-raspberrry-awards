const request = require('supertest');
const { startApp } = require('../../src/app');
const { bulkMoviesData } = require('../../src/config/sqlite');

describe('find Interval: Movies Controller', () => {
    let app;

    beforeAll(() => {
        process.argv.push('movielist.test.csv');
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
                    producer: 'Albert Camus',
                    interval: 39,
                    previousWin: 1980,
                    followingWin: 2019,
                },
                {
                    producer: 'Lucius Seneca',
                    interval: 39,
                    previousWin: 1980,
                    followingWin: 2019,
                },
            ],
            min: [
                {
                    producer: 'Joel Silver',
                    interval: 1,
                    previousWin: 1990,
                    followingWin: 1991,
                },
                {
                    producer: 'White Lies',
                    interval: 1,
                    previousWin: 1991,
                    followingWin: 1992,
                },
                {
                    producer: 'Raul Seixas',
                    interval: 1,
                    previousWin: 1995,
                    followingWin: 1996,
                },
                {
                    producer: 'Rita Lee',
                    interval: 1,
                    previousWin: 1995,
                    followingWin: 1996,
                },
            ],
        });
    });
});
