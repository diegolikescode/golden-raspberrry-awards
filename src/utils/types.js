/**
 * @typedef {Object} Movie
 * @property {number} year
 * @property {string} [title]
 * @property {string} [studios]
 * @property {string} producers
 * @property {string} [winner]
 */

/**
 * @typedef {Object} IntervalDescription
 * @property {string} producer
 * @property {number} interval
 * @property {number} previousWin
 * @property {number} followingWin
 */

const makeMovieForDb = (csvRow) => {
    const [year, title, studios, producers, winner] = csvRow;
    return {
        year,
        title,
        studios,
        producers,
        winner,
    };
};

module.exports = {
    makeMovieForDb,
};
