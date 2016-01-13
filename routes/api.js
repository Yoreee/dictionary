var express = require('express');
var router = express.Router();
var Words = require('../models/word.js')

router.get('/words', function(req, res, next) {
	Words.find(function(err, word) {
		if (err) {
			return next(err);
		} else {
			res.json(word)
		}
	})
});

router.get('/words/:id', function(req, res, next) {
	Words.findById(function(err, word) {
		if (err) {
			return next(err)
		} else {
			res.json(word)
		}
	})
});

router.post('/words', function(req, res, next) {
	Words.create(req.body, function(err, word) {
		if (err) {
			return next(err)
		} else {
			res.json(word);
		};
	})
});

router.put('/words/:id', function(req, res, next) {
	Words.findByIdAndUpdate(req.params.id, req.body, function(err, word) {
		if (err) {
			return next(err)
		} else {
			res.json(word)
		}
	})
});

router.delete('/words/:id', function(req, res, next) {
	Words.findByIdAndRemove(req.params.id, req.body, function(err, word) {
		if (err) {
			return next(err);
		} else {
			res.json(word)
		}
	})
});

module.exports = router