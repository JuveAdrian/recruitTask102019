const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const errorRoutes = require('./routes/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

app.use(userRoutes);
app.use(errorRoutes);

const port = process.env.PORT || 5656;

app.listen(port, () => {
    console.log(`App work on https://localhost: ${port}`);
});