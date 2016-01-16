var mongoose = require('mongoose');


var WordSchema = new mongoose.Schema({
	word: String,
	definition: Array
})


module.exports = mongoose.model('Word', WordSchema);