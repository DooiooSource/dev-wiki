/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
 , env = process.env.NODE_ENV || 'development'
 , config = require('../../config/config')[env]
 , Schema = mongoose.Schema


var TreeSchema = new Schema({
    text: {type: Number, default: '', trim: true},
    parent: {type: Schema.Types.ObjectId}
});

/**
 * Methods
 */

TreeSchema.methods = {

}

/**
 * Statics 
 */

TreeSchema.statics = {

}

mongoose.model('Tree', TreeSchema);