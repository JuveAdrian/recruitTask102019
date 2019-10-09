const express = require('express');

const router = express.Router();

const errorsControllers = require('../controllers/errors');

router.use(errorsControllers.getError404);

module.exports = router;