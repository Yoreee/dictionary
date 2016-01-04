var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
	res.render('index');
})


router.post('/lookup', function(req, res, next) {
    console.log(req.body)
    var data;
    request({
        url: 'https://montanaflynn-dictionary.p.mashape.com/define?word=' + req.body.word, //URL to hit
        qs: {from: 'blog example', time: +new Date()}, //Query string data
        method: 'GET', //Specify the method
        headers: { //We can define headers too
            'X-Mashape-Key': process.env.mashape_key
        }
    }, function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            data = body;
            console.log(response.statusCode, body);
            res.json(data)
        }
    });
})

//Export the router
module.exports = router;