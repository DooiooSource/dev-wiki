var mongoose = require('mongoose')
  , Article = mongoose.model('Article')
  , _ = require('underscore')


/** 
* List
**/

exports.index = function (req, res) {

	Article.list(function(err, articles){
		if(err) return res.render('500');
		console.log(articles);
		Article.count().exec(function(err, count){
			res.render('articles/index', {
				title: "首页",
				articles: articles
			});
		})
	});
}

/**
 * New article
 */

exports.new = function(req, res){
	res.render('articles/new', {"title": "发布"});
}

/**
 * Create an article
 */

exports.create = function(req, res){
	var article = new Article(req.body);
	
	article.saveit(function(err){
		if(!err){
			return res.redirect('/articles/' + article._id);
		}
		res.render('/articles/new',{
			article: article
		});
	})	

}


/** 
* 文章页
**/
exports.show = function(req, res){
	console.log(req.article);
	res.render('articles/show',{
		article: req.article
	});
}

exports.edit = function(req, res){
	res.render('articles/show');
}

exports.delete= function(req, res){
	res.render('articles/show');
}

