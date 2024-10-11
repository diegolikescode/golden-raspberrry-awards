const { Router } = require('express');
const { findInterval } = require('../controllers/movies');

const router = Router();
router.get('/find-interval', findInterval);

module.exports = router;
