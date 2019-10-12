const fetch = require('node-fetch');

let country;

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

    async fetchAPII() {
        const pm25List = [];
        const api_url = `https://api.openaq.org/v1/latest?country=${country.selectCountry}&limit=1000`;
        console.log(`halo ${country.selectCountry}`);
        console.log(api_url);
        const response = await fetch(api_url);
        const json = await response.json();
        for(let i=0; i<1000; i++){
            try {
                for (let item of json.results[i].measurements)
                if (item.parameter == 'pm10'){
                    console.log(`test: ${item.parameter}`)
                    let city = json.results[i].city;
                    let param = item.parameter;
                    let value = item.value;
                    pm25List.push({city, param, value})
                    //console.log(`${json.results[i].city} parametr: ${item.parameter}, wartosc: ${item.value} `);
                } else {
                    console.log(item.parameter);
                }
            }
            catch(error) {
                console.log(error);
            }
            
            
        }

        for (let i of pm25List) {
            console.log(i);
        }
    }
}