const express = require('express');
const moviesRouter = require('./routes/movies');
const logger = require('pino').default();

const startApp = (port) => {
    const app = express();
    app.use(express.json());

    app.get('/', (_, res) => {
        res.status(200).json({ status: 'healthy' });
    });
    app.use('/api/movies', moviesRouter);

    app.use((err, _, res, next) => {
        logger.error(`Something went wrong: ${err}`);
        res.status(500).json({ message: JSON.stringify(err) });
    });

    return app.listen(port, () => {
        console.log(`running on port ${port}`);
    });
};

module.exports = { startApp };
