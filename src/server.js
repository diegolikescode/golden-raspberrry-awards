const { bulkMoviesData } = require('./config/sqlite');
const { startApp } = require('./app');

bulkMoviesData();
startApp(3000);
