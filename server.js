var express = require('express');
var path = require('path');
var request = require('request');
var dotenv = require('dotenv').load();
var jade = require('jade');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var app = express();


var routes = require('./routes')
var api = require('./routes/api.js')


app.set('views', path.join(__dirname, 'public/views'));
// app.set('styles', path.join(__dirname, 'public/styles'))
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routes);
app.use('/api', api)

//CORS Support
app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE");
	res.header('Access-Control-Allow-Headers', 'Content-Type')
	next();
})

mongoose.connect('mongodb://localhost/dictionaryApp', function(err) {
    if (err) {
        console.log(err)
    } else {
        console.log('connected to mongodb successfully')
    }
})

mongoose.connection.once('open', function() {
	
	//Load all models

	app.models = require('./models/index.js');
	app.listen(3000, function(req, res) {
		console.log('listening');
	});
});

module.exports = app;