(function(){
	
	var app = angular.module("wordsApp", []);

	app.controller('WordController', function($http) {
		var that = this;
		this.query;
		this.data;
		this.repeatData;
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
		        that.data = res.data.definitions
		        that.repeatData = res.data.definitions.map(function(value, index) {
		        	return {
		        		data: value,
		        		value: index +1
		        	}
		        })
		        console.log(that.repeatData);
		        document.getElementsByClassName('word-input')[0].value = "";
		    }, function error(res) {
		        console.log(res.status)
		    	});
	    }
	})



})();