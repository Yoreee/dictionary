
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
		this.savedAlert = 1;
		this.showCurrent = {};

		//This is changes the navstate to show the index of words.
		this.showIndex = function() {
			that.navState = 1;
		};
		//This changes the navstate to show the search box to look up words.
		this.showLookup = function() {
			that.navState = 2;
		};
		//This changes the navstate to show the definition of your saved word.
		this.showWord = function() {
			that.navState = 3;
		};

		//This makes an HTTP request to the Words API and get back the definitions. 
		this.lookup = function() {
	        $http({
		        url: 'https://montanaflynn-dictionary.p.mashape.com/define?word=' + this.query, //URL to hit
		        qs: {from: 'blog example', time: +new Date()},
		        method: 'GET',
		        headers: {
		            'X-Mashape-Key': "uxtlI0eyGLmsh2EDGWuYiRSaBHwQp19aJnCjsnpLkbTx0SdeWu"
	        	}
		    })
		    .then(function success(res) {
		        // console.log(res.data);
		        document.getElementById('container').innerHtml = "";
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

	    // This saves a new word to our database.
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
	    		that.savedAlert = 2;
	    		document.getElementById('star').style.color = "red";
	    	})
	    };

	    // This retrieves all of our saved words from our database.
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
	    // This deletes words from our database.
	    this.remove = function(id) {
	    	$http({
	    		method: "DELETE",
	    		url: '/api/words/' + id
	    	})
	    	.then(function success(res) {
	    		console.log(res)
	    	});
	    };

	    // This retrieves a words definitions from our database.
	    this.show = function(id) {
	    	$http({
	    		method: "GET",
	    		url: '/api/words/' + id
	    	})
	    	.then(function success(res) {
	    		console.log(res.data)
	    		that.showCurrent.word = res.data.word;
	    		that.showCurrent.definition = res.data.definition;
	    	}, function error(res) {
	    		console.log(res)
	    	});
	    };

	})

})();