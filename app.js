const express = require('express');
const port = 3000
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodekb');

let db = mongoose.connection;
//Check connection
db.once('open', function () {
    console.log('connected to MOngoDB')
})


//Check for DB errors
db.on('error', function (err) {
    console.log(err);
});

//init app
const app = express();

//Bring in Models
let Articles = require('./models/article');

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Home Route
app.get('/', function (req, res) {

    Articles.find({}, function (err, articles) {
        if(err){
            console.log(err);
        }
        res.render('index', {
            title: 'Article',
            articles: articles
        });

    });

});

//Add route
app.get('/article/add', (req, res) => res.render('add_article', {
    title: 'add article'
}));

//Start server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));