/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema


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
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date}    
});



ArticleSchema.methods = {
	saveit: function(cb){
		this.save(cb);
	}
}


ArticleSchema.statics = {
  load: function(id, cb){
    this.findOne({_id: id})
      .exec(cb);
  },

	list: function(cb){
		this.find()
			.exec(cb);
	}
}


mongoose.model('Article', ArticleSchema);