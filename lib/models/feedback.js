/**
 * Created by welkang on 14-10-11.
 */

'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 *
 */

var FeedbackSchema = new Schema({
    linkTo: {
        type: String,
        default: ''
    },
    body: {
        type: String,
        default: ''
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


mongoose.model('Feedback', FeedbackSchema);
