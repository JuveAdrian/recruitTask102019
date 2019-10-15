const Country = require('../models/country');
const fetch = require('node-fetch');

exports.getIndexPage = (req, res, next) => {
    res.render('index', {
        pageTitle: 'Most polluted cities'
    });
};

exports.postFormData = (req, res, next) => {
    const country = new Country(req.body.selectCountry);
    country.save();
    const data = country.fetchAll();

    const url = `https://api.openaq.org/v1/latest?country=${data.selectCountry}&limit=3000&parameter=pm25`;
    console.log(url);

    fetch(url).then((response) => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error('Unable to fetch the data');
        }
    }).then((data) => {
        let cities = data.results;
        cities.sort((a, b) => (a.measurements[0].value > b.measurements[0].value) ? -1 : 1);
        return cities;
    }).then((apidata) => {
        
            // usunac duplikaty miast

        res.render('results', {
            status: 'udalosiewyswietlic',
            country: data.selectCountry,
            data: apidata
        });
    });
};
