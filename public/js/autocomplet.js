function validateForm() {
    const x = document.forms["countryname"]["selectCountry"].value;
    if (x != "PL" && x != "ES" && x != "FR" && x != "DE" && x != "Poland") {
        alert('Only PL, DE, ES, FR');
        return false;
    }
}




document.querySelector('#submit-btn').addEventListener('click', () => {
    console.log('klik');  
    localStorage.setItem('nameofcountry', document.forms["countryname"]["selectCountry"].value);
})


 document.querySelector('#select-country').value = localStorage.getItem('nameofcountry');


  
