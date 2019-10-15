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
        let citiesArr = [];
        cities.sort((a, b) => (a.measurements[0].value > b.measurements[0].value) ? -1 : 1);

        for(let item of cities)
        citiesArr.push({ name: item.city, value: item.measurements[0].value} );
        
        console.log(citiesArr);
        
        return cities;
    }).then((apidata) => {
        
            // ----------------------
            // usunac duplikaty miast
            // ----------------------
        

        for(let i=0; i<11; i++) {

            let city_query;

            if (country.selectCountry === "DE" || country.selectCountry == "ES") {
                city_query = apidata[i].location;
            } else {
                city_query = apidata[i].city;
            }
            
            city_query.replace(" ", "_");
            

            const urlWikiApi = `https://pl.wikipedia.org/w/api.php?action=opensearch&format=json&search=${city_query}`;
            console.log(urlWikiApi);
            fetch(urlWikiApi).then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw new Error('Unable to fetch the data');
                }
            }).then((data, err) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log(`OPIS - ${data[2][0]}`);
                }
                
                
                
            }).catch((err) => {
                if(err) {
                    console.log('Blad pobierania opisu');
                }
            });
            
        }
        res.render('results', {
            status: 'udalosiewyswietlic',
            country: data.selectCountry,
            data: apidata,
            country: country
        });
        
    });
};
