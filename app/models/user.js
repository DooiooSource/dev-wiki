/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema

  var UserSchema = new Schema({
    empNo: {type: Number},
    username: {type: String, default: '', trim: true},
    createdAt: {type: Date, default: Date.now}
});

mongoose.model('User', UserSchema);