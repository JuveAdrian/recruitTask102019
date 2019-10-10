let country;

module.exports = class Country {
    constructor(nameCountry){
        this.nameCountry = nameCountry;
    }

    save() {
        country = this;
    }

    fetchAll() {
        return country;
    }
}