const Country = require('../models/country');
const fetch = require('node-fetch');
const nodeGeocoder = require('node-geocoder');

const option = {
    provider: 'google',
    apiKey: 'AIzaSyDzaF4KiyKOfmQcOwwy5iBNfkBG-2rKI1M'
}

const geocoder = nodeGeocoder(option);

exports.getIndexPage = (req, res, next) => {
    res.render('index', {
        pageTitle: 'Most polluted cities'
    });
};

exports.postFormData = (req, res, next) => {
    const country = new Country(req.body.selectCountry);
    country.save();
    const data = country.fetchAll();
    const citiesArr = [];
    const citiesName = [];
    const url = `https://api.openaq.org/v1/latest?country=${data.selectCountry}&limit=3000&parameter=pm25`;
    console.log(url);
    let names = [];
    fetch(url).then((response) => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error('Unable to fetch the data');
        }
        }).then((data) => {
            const cities = data.results;
            
            cities.sort((a, b) => (a.measurements[0].value > b.measurements[0].value) ? -1 : 1);
            
            //console.log(cities);

            let urlWikiApi = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=`;
            
            for(let item of cities){            
                citiesArr.push({ name: item.city, coordinates: item.coordinates, value: item.measurements[0].value } );
            }
           //console.log(citiesArr);

            let tabelaMiast = [];
            for(let i=0; i<12; i++){
                console.log({lat: cities[i].coordinates.latitude, lon: cities[i].coordinates.longitude})
                geocoder.reverse({lat: cities[i].coordinates.latitude, lon: cities[i].coordinates.longitude}, function(err, data) {
                        console.log(`${urlWikiApi+data[0].city}`)
                        fetch(`${urlWikiApi+data[0].city}`).then((response) => {
                            if (response.status === 200) {
                                return response.json() ;
                            } else {
                                throw new Error('Unable to fetch the data');
                            }
                        }).then((datawiki) => {
                            tabelaMiast.push({name: data[0].city, value: cities[i].measurements[0].value, lat: citiesArr[i].coordinates.latitude, lon: citiesArr[i].coordinates.longitude, desc: datawiki[2][0]}); 
                        
                        }).catch((err) => {
                            console.log(err);
                        });
                });
            

            }

            function myFunction1() {
                setTimeout(function(){
                      
                    tabelaMiast.sort((a, b) => (a.value > b.value) ? -1 : 1);
                     
                    }, 3000);
            }

            myFunction1();

            console.log(tabelaMiast);
            function myFunction() {
                setTimeout(function(){
                      console.log(tabelaMiast) 
                        
                      console.log(`1 - ${tabelaMiast[0].name}`)
                      res.render('results', {
                        status: 'udalosiewyswietlic',
                        cities: tabelaMiast,
                        value: cities,
                        country: country.selectCountry
                    });
                    }, 3000);
              }

            myFunction(); 

        }).catch((err) => {
            console.log(err);
        });    
};
