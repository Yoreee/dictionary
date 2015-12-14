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













module.exports = app;