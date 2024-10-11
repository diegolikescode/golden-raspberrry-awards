const logger = require('pino').default();
const { fetchMovies } = require('../config/sqlite');

/**
 * @returns {Array<string>}
 */
const parseProducers = (str) => str.split(/,\s*and\s*|\s*,\s*|\s+and\s+/);

/**
 * @param {import('express').Response} res
 */
async function findInterval(_, res) {
    logger.info('Start finding interval');
    const { success, data: movies } = await fetchMovies();
    if (!success) {
        logger.error('Error trying to fetch movies data from database');
        res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
        return;
    }

    /** @type {import('../utils/types').IntervalDescription[]}  */
    let max = [];
    let maxInterval = 0;

    /** @type {import('../utils/types').IntervalDescription[]}  */
    let min = [];
    let minInterval = Number.MAX_SAFE_INTEGER;

    /** @type {Map<string, number>} */
    const map = new Map();
    for (let i = 0; i < movies.length; i++) {
        const movieProducers = parseProducers(movies[i].producers);
        movieProducers.forEach((producer) => {
            const previousWin = map.get(producer);
            if (!previousWin) {
                map.set(producer, movies[i].year);
                return;
            }

            const interval = movies[i].year - previousWin;

            if (interval === maxInterval) {
                max.push({
                    producer,
                    interval,
                    previousWin,
                    followingWin: movies[i].year,
                });
            }

            if (interval > maxInterval) {
                max = [
                    {
                        producer,
                        interval,
                        previousWin,
                        followingWin: movies[i].year,
                    },
                ];
                maxInterval = interval;
            }

            if (interval === minInterval) {
                min.push({
                    producer,
                    interval,
                    previousWin,
                    followingWin: movies[i].year,
                });
            }

            if (interval < minInterval) {
                min = [
                    {
                        producer,
                        interval,
                        previousWin,
                        followingWin: movies[i].year,
                    },
                ];
                minInterval = interval;
            }

            map.set(producer, movies[i].year);
        });
    }

    logger.info('Successfully found min and max intervals');
    res.status(200).json({ max, min });
}

module.exports = {
    findInterval,
};
