const Country = require('../models/country');

exports.getIndexPage = (req, res, next) => {
    res.render('index', {
        pageTitle: 'Most polluted cities'
    });
};

exports.postFormData = (req, res, next) => {
    const country = new Country(req.body.selectCountry);
    country.save();
    console.log(country.fetchAll());
    country.fetchAPII();
    res.redirect('/home');
} 