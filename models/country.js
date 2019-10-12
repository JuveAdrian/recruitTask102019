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
        const api_url = `https://api.openaq.org/v1/latest?country=${country.selectCountry}&limit=10`;
        console.log(`halo ${country.selectCountry}`);
        console.log(api_url);
        const response = await fetch(api_url);
        const json = await response.json();
        console.log(json);
    }
}