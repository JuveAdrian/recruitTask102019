const express = require('express');

const router = express.Router();

const usersControllers = require('../controllers/users');

router.get('/home', usersControllers.getIndexPage);

router.post('/form-data', usersControllers.postFormData);

router.get('/form-data', (req, res, next) => {

    console.log('getformdata');
});

module.exports = router;