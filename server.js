var express = require('express');
var app = express();
var request = require('request')

app.listen(3000, function(req, res) {
	console.log('listening')
})

request({
    url: 'https://montanaflynn-dictionary.p.mashape.com/define?word=velleity', //URL to hit
    qs: {from: 'blog example', time: +new Date()}, //Query string data
    method: 'GET', //Specify the method
    headers: { //We can define headers too
        'X-Mashape-Key': 'uxtlI0eyGLmsh2EDGWuYiRSaBHwQp19aJnCjsnpLkbTx0SdeWu'
    }
}, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
});