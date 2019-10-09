const express = require('express');

const router = express.Router();

const usersControllers = require('../controllers/users');

router.use('/home', usersControllers.getIndexPage);

module.exports = router;