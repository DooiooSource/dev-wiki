var mongoose = require('mongoose')
  , Article = mongoose.model('Article')
  , _ = require('underscore')


/**
 * New article
 */
exports.new = function(req, res){
	console.log("new articles");
}

/** 
* 首页
**/
exports.index = function (req, res) {
	res.render('article/index', {"title": "首页"});
}