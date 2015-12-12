var express = require('express');
var path = require('path');
var request = require('request');
var dotenv = require('dotenv').load();
var jade = require('jade');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')

var app = express();
var routes = require('./routes/index')


app.set('views', path.join(__dirname, 'public/views'));
// app.set('styles', path.join(__dirname, 'public/styles'))
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routes);


app.listen(3000, function(req, res) {
	console.log('listening');
});




request({
    url: 'https://montanaflynn-dictionary.p.mashape.com/define?word=velleity', //URL to hit
    qs: {from: 'blog example', time: +new Date()}, //Query string data
    method: 'GET', //Specify the method
    headers: { //We can define headers too
        'X-Mashape-Key': process.env.mashape_key
    }
}, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
});


module.exports = app;