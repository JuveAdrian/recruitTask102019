const path = require('path');
const nodeGeocoder = require('node-geocoder');

const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const errorRoutes = require('./routes/error');

const app = express();

const option = {
    provider: 'google',
    apiKey: 'AIzaSyDzaF4KiyKOfmQcOwwy5iBNfkBG-2rKI1M'
}

const geocoder = nodeGeocoder(option);


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());


app.use('/geotest', (req, res, next) => {

    geocoder.reverse({lat: 43.306656, lon: -5.689716}, function(err, data) {
        console.log(data[0].city);
      });

      geocoder.reverse({lat: 43.4015, lon: -5.80287}, function(err, data) {
        console.log(data[0].city);
      });
      
});

app.use(userRoutes);
app.use(errorRoutes);



const port = process.env.PORT || 5656;

app.listen(port, () => {
    console.log(`App work on https://localhost: ${port}`);
});