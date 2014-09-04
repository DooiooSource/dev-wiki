/**
 * Created by welkang on 14-9-2.
 */

'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

/**
 * type:
 * reply: xx 回复了你的文章
 * reply2: xx 在yy文章中回复了你
 * at: xx @了你
 * @type {Schema}
 */
var MessageSchema = new Schema({
    type: {type: String},
    authorId: {type: ObjectId},
    articleId: {type: ObjectId},
    commentId: {type: ObjectId},
    hasRead: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now}
});

mongoose.model('Message', MessageSchema);