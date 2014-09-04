'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
    level: {
        type: Number
    },
    code: {
        type: Number
    },
    name: {
        type: String
    },
    alias: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

/**
 * Methods
 */

CategorySchema.methods = {

    addComment: function(userId, comment, cb) {
        this.comments.push({
            body: comment.body,
            user: userId
        });

        this.save(cb);
    }

};


mongoose.model('Category', CategorySchema);
