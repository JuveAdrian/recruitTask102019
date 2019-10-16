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

            let urlWikiApi = `https://pl.wikipedia.org/w/api.php?action=opensearch&format=json&search=`;
            
            for(let item of cities){            
                citiesArr.push({ name: item.city, coordinates: item.coordinates, value: item.measurements[0].value } );
            }
           //console.log(citiesArr);

            let tabelaMiast = [];
            for(let i=0; i<12; i++){
                geocoder.reverse({lat: citiesArr[i].coordinates.latitude, lon: citiesArr[i].coordinates.longitude}, function(err, data) {
                    if(citiesArr){
                        fetch(`${urlWikiApi} + ${data[0].city}`).then((response) => {
                            if (response.status === 200) {
                                return response.json();
                            } else {
                                throw new Error('Unable to fetch the data');
                            }
                        }).then((datawiki) => {
                            tabelaMiast.push({name: data[0].city, desc: datawiki[2][0]});
                        });
                        
                    } else {
                        console.log('brak wspolrzednych');
                    }
                });
            }
            function myFunction() {
                setTimeout(function(){
                      console.log(tabelaMiast) 

                      console.log(`1 - ${tabelaMiast[0].name}`)
                      res.render('results', {
                        status: 'udalosiewyswietlic',
                        cities: tabelaMiast
                    });
                    }, 1000);
              }

            myFunction(); 
            /* res.render('results', {
                status: 'udalosiewyswietlic',
                cities: names
            }); */

        });

    
};

/* 
res.render('results', {
    status: 'udalosiewyswietlic',
    country: data.selectCountry,
    cities: citiesArr
});
 */


/* let urlWikiApi = `https://pl.wikipedia.org/w/api.php?action=opensearch&format=json&search=`;
        
for(let item of cities){
    urlWikiApi = `https://pl.wikipedia.org/w/api.php?action=opensearch&format=json&search=${item.city}`;
    const fetchdate = fetch(urlWikiApi).then((response) => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('Unable to fetch the data');
        }
    }).then((data) => {
        //console.log(data);
        let temp = data[2][0]
       return ( temp );
        
    }).catch((err) => {
        if(err) {
            console.log('Blad pobierania opisu');
        }
    }); */