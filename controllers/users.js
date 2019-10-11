const Country = require('../models/country');

exports.getIndexPage = (req, res, next) => {
    res.render('index', {
        pageTitle: 'Most polluted cities'
    });
};

exports.postFormData = (req, res, next) => {
    const country = new Country(req.body.nameCountry);
    country.save();
    console.log(country.fetchAll());
    res.redirect('/home');
} 