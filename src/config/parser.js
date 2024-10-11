const fs = require('fs');
const path = require('path');
const { makeMovieForDb } = require('../utils/types');
const logger = require('pino').default();

const findFilePath = (fileName = 'movielist.csv') => {
    let currDir = __dirname;

    while (true) {
        const filePath = path.join(currDir, fileName);
        if (fs.existsSync(filePath)) {
            logger.info(`filePath for ${fileName} was found`);
            return filePath;
        }

        const parentDir = path.dirname(currDir);
        if (currDir === parentDir) {
            logger.error(`Could not find the filePath for ${fileName}`);
            return null;
        }
        currDir = parentDir;
    }
};

/**
 * @param {string} filePath
 * @param {string} delimiter
 * @returns {Movie[]}
 */
function parser(fileName, delimiter = ';') {
    const filePath = findFilePath(fileName);

    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.trim().split('\n');
        const movies = [];

        lines.splice(0, 1);
        lines.forEach((l) => {
            /**
             * Values should be always like this:
             * [0] year | [1] title | [2] studios | [3] producers | [4] winner
             */
            const values = l.split(delimiter);
            const movie = makeMovieForDb(values);
            movies.push(movie);
        });

        logger.info('Movies parsed successfully');
        return movies;
    } catch (err) {
        logger.error(`Error trying to parse ${fileName}`);
        throw new Error(err);
    }
}

module.exports = parser;
