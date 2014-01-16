/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
 , env = process.env.NODE_ENV || 'development'
 , config = require('../../config/config')[env]
 , Schema = mongoose.Schema


/**
 * //Todo
 * [] editHistory
 */

var ArticleSchema = new Schema({
    title: {type: String, default: '', trim: true},
    body: {type: String, default: '', trim: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    updater: {type: Array, ref: 'User'},
    comments: [{
        body: {type: String, default: ''},
        user: {type: Schema.Types.ObjectId, ref: 'User'},
        createdAt: {type: Date, default: Date.now}
    }],
    category: {type: String, default: '', trim: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date}    
});

/**
 * Methods
 */

ArticleSchema.methods = {

    addComment: function(userId, comment, cb){
        this.comments.push({
            body: comment.body,
            user: userId
        })

        this.save(cb)
    }

}

/**
 * Statics 
 */

 ArticleSchema.statics = {
    load: function(id, cb){
        this.findOne({_id: id})
        .populate('user', 'username empNo')
        .populate('comments.user')
        .exec(cb);
    },

    list: function(options, cb){
        var criteria = options.criteria || {};
        this.find(criteria)
        .populate('user', 'username empNo')
        .sort({'createdAt': -1})
        .limit(options.perPage)
        .skip(options.perPage * options.page)
        .exec(cb);
    }
}

mongoose.model('Article', ArticleSchema);