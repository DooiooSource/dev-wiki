/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema


var getTags = function (tags) {
  return tags.join(',')
}

var setTags = function (tags) {
  return tags.split(',')
}

/**
 * //Todo
 * [] tags
 * [] comments
 * [] editHistory
 */

var ArticleSchema = new Schema({
    title: {type: String, default: '', trim: true},
    body: {type: String, default: '', trim: true},
    user: {type: Schema.ObjectId, ref: 'User'},
    category: {type: String, default: '', trim: true},
    publish: {type: String, default: 'publish', trim: true},
    tags: {type: [], get: getTags, set: setTags},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date}    
});

/**
 * Methods
 */

ArticleSchema.methods = {
	saveit: function(cb){
		this.save(cb);
	}
}

/**
 * Statics 
 */

ArticleSchema.statics = {
  load: function(id, cb){
    this.findOne({_id: id})
        .exec(cb);
  },

	list: function(options, cb){
    var criteria = options.criteria || {};
		this.find(criteria)
            .populate('user', 'empNo username')
            .sort({'createdAt': -1})
            .limit(options.perPage)
            .skip(options.perPage * options.page)
    		.exec(cb);
	}
}

mongoose.model('Article', ArticleSchema);