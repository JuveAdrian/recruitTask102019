const path = require('path');

const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/home', (req, res, next) => {
    res.send(console.log('test from /home'));
});

app.use((req, res, next) => {
    res.status(404).render('404', {
        pageTitle: '404 Error'
    });
})

const port = process.env.PORT || 5656;

app.listen(port, () => {
    console.log(`App work on https://localhost: ${port}`);
});