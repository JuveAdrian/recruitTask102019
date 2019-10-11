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
}