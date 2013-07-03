var mongoose = require('mongoose')
  , Article = mongoose.model('Article')
  , _ = require('underscore')


/**
 * New article
 */
exports.new = function(req, res){
	res.render('articles/new', {"title": "发布"});
}

/** 
* 首页
**/
exports.index = function (req, res) {
	res.render('articles/index', {"title": "首页"});
}

/** 
* 文章页
**/
exports.show = function(req, res){
	res.render('articles/show')
}