(function(){
	
	var app = angular.module("wordsApp", []);

	app.controller('WordController', function($http) {
		this.query;
		this.definition;
		this.lookup = function() {
	        $http({
		        url: 'https://montanaflynn-dictionary.p.mashape.com/define?word=' + this.query, //URL to hit
		        qs: {from: 'blog example', time: +new Date()}, //Query string data
		        method: 'GET', //Specify the method
		        headers: { //We can define headers too
		            'X-Mashape-Key': "uxtlI0eyGLmsh2EDGWuYiRSaBHwQp19aJnCjsnpLkbTx0SdeWu"
	        	}
		    })
		    .then(function success(res) {
		        console.log(res.data)
		        console.log('success')
		    }, function error(res) {
		        console.log(res.status)
		    	});
	    }
	})



})();