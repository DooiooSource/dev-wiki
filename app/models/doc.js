var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var DocSchema = new Schema({
	title: {type: String, default: '', trim: true},
	body: {type: String, default: '', trim: true}
});