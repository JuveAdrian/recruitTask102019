const fetch = require('node-fetch');
let country;
const pmList = [];

module.exports = class Country {
    constructor(selectCountry){
        this.selectCountry = selectCountry;
    }

    save() {
        country = this;
    }

    fetchAll() {
        return country;
    }

    fetchAPII() {
        const url = `https://api.openaq.org/v1/latest?country=${country.selectCountry}&limit=1000&parameter=pm25`;

        fetch(url).then((response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw new Error('Unable to fetch the puzzle');
            }
        }).then((data) => {
            let cities = data.results;
            cities.sort((a, b) => (a.measurements[0].value > b.measurements[0].value) ? -1 : 1);
            return cities;    
        }).then((cities) => {
            for(let i=0; i<10; i++){
                    console.log(`${cities[i].city} - ${cities[i].measurements[0].parameter} - ${cities[i].measurements[0].value}`);
                    pmList.push(cities[i].city);
            }
            return pmList;
        }).catch((error) => {
            console.log(error);
        });        
    };   

    displayAPI() {
        //console.log(JSON.parse(pmList));
        JSON.parse(pmList);
        for(let i=0; i<10; i++) {
            JSON.parse(pmList[i]);
            console.log(`From displayAPI() ${pmList[i]}`);
        }
        return pmList;
    }
        
};