
(function(){
	var app = angular.module("wordsApp", []);

	app.controller('WordController', function($http) {
		var that = this;
		this.query;
		this.data;
		this.term;
		this.defArray;
		this.repeatData;
		this.navState;
		this.indexDisplay;
		this.showCurrent = {};

		this.showIndex = function() {
			that.navState = 1;
		};

		this.showLookup = function() {
			that.navState = 2;
		};

		this.showWord = function() {
			that.navState = 3;
		};

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
		        // console.log(res.data);
		        that.data = res.data.definitions;
		        that.repeatData = res.data.definitions.map(function(value, index) {
		        	return {
		        		data: value,
		        		value: index +1
		        	}
		        });

		        that.term = that.query;
		        document.getElementsByClassName('word-input')[0].value = "";
		        // console.log(that.data)
		       	that.defArray = that.data.map(function(value, index) {
	    			return value.text
	    		})
	    		console.log(that.defArray.length)
	    		that.query = "";
		    }, function error(res) {
		        console.log(res.status)
		    });
	    };

	    this.new = function() {
	    	$http({
	    		method: 'POST',
	    		url: '/api/words',
	    		data: {
	    			word: that.term,
	    			definition: that.defArray
	    		}
	    	})
	    	.then(function success(res) {
	    		console.log('saved!!!')
	    	})
	    };

	    this.index = function() {
	    	$http({
	    		method: 'GET',
	    		url: '/api/words'
	    	})
	    	.then(function success(res) {
	    		console.log(res)
	    		that.indexDisplay = res.data

	    	})
	    };

	    this.remove = function(id) {
	    	$http({
	    		method: "DELETE",
	    		url: '/api/words/' + id
	    	})
	    	.then(function success(res) {
	    		console.log(res)
	    	});
	    };

	    this.show = function(id) {
	    	$http({
	    		method: "GET",
	    		url: '/api/words/' + id
	    	})
	    	.then(function success(res) {
	    		console.log(res.data)
	    		that.showCurrent.word = res.data.word;
	    	}, function error(res) {
	    		console.log(res)
	    	});
	    };

	})

})();