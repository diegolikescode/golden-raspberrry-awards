const parser = require('./parser');

const logger = require('pino').default();

const sqlite = require('sqlite3').verbose();

const conn = (function setupDatabase() {
    const conn = new sqlite.Database(':memory:');

    conn.serialize(() => {
        conn.run(`
        CREATE TABLE IF NOT EXISTS Movies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            year INTEGER,
            title TEXT,
            studios TEXT,
            producers TEXT,
            winner TEXT
        )`);
    });

    return conn;
})();

function bulkMoviesData() {
    const movies = parser(process.argv.pop());
    logger.info('Starting movies data bulk');
    conn.serialize(() => {
        conn.run('BEGIN TRANSACTION');

        const query = `
            INSERT INTO Movies (year, title, studios, producers, winner)
            VALUES (?, ?, ?, ?, ?)`;

        const stmt = conn.prepare(query);
        movies.forEach((m) => {
            stmt.run(m.year, m.title, m.studios, m.producers, m.winner);
        });
        stmt.finalize();

        conn.run('COMMIT');
    });
    logger.info('Movies bulk executed successfully');
}

/**
 * @returns {Promise<{ success: boolean, data: Movie[] }}>}
 */
async function fetchMovies() {
    try {
        const query = `
            SELECT year, producers FROM Movies
            WHERE winner = 'yes'
            ORDER BY year;
        `;

        return new Promise((resolve, reject) => {
            conn.all(query, [], (err, data) => {
                if (err) {
                    logger.error(`Error while trying to fetch movies ${err}`);
                    return reject({ success: false });
                }
                logger.info(
                    `Success fetching movies from SQLite, a total of ${data.length} movies fetched`
                );
                return resolve({ success: true, data });
            });
        });
    } catch (err) {
        logger.error(`Error while trying to fetch movies from SQLite`);
        return { success: false };
    }
}

module.exports = {
    conn,
    bulkMoviesData,
    fetchMovies,
};
