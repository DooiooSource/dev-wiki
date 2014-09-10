'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 *
 */

var ArticleSchema = new Schema({
    title: {
        type: String,
        default: '',
        trim: true
    },
    body: {
        type: String,
        default: '',
        trim: true
    },
    html: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    updater: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: {
        type: []
    },
    comments: [{
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
    }],
    category: {
        type: String,
        default: '',
        trim: true
    },
    status: {
        type: Number,
        trim: true,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    commentAt: {
        type: Date
    }
});

/**
 * Methods
 */

ArticleSchema.methods = {

    addComment: function(userId, content, cb) {
        this.commentAt = new Date(); // 更新最后评论时间
        this.comments.push({
            body: content,
            user: userId
        });

        this.save(cb);
    }

};

/**
 * Statics
 */

ArticleSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        })
            .populate('user', 'username empNo')
            .populate('comments.user')
            .exec(cb);
    },

    list: function(options, cb) {
        var criteria = options.criteria || {};
        this.find(criteria, '-body -html')
            .populate('user', 'username empNo')
            .populate('updater', 'username empNo')
            .populate('comments.user', 'username empNo')
            .sort({
                'commentAt': -1,
                'updatedAt': -1,
                'createdAt': -1
            })
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb);
    }
};

mongoose.model('Article', ArticleSchema);
