'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    empNo: {
        type: Number
    },
    username: {
        type: String,
        default: '',
        trim: true
    }
});

mongoose.model('User', UserSchema);
