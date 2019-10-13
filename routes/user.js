const express = require('express');

const router = express.Router();

const usersControllers = require('../controllers/users');

router.get('/home', usersControllers.getIndexPage);

router.post('/form-data', usersControllers.postFormData);

router.get('/results', usersControllers.getResults);

module.exports = router;