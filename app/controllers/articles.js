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

exports.show = function(req, res){
	Article.load(req.params.id, function(err, article){
		if(err) return res.render('500');
		res.render('articles/show', {article: article});
	})
}

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

exports.edit = function(req, res){
	console.log(req.params.id);
	Article.load(req.params.id, function(err, article){
		if(err) return res.render('500');
		console.log(article);
		res.render('articles/edit', {article: article});
	})
}

exports.update = function(req, res){
	Article.load(req.params.id, function(err, article){
		if(err) return res.render('500');
		article = _.extend(article, req.body);
		article.saveit(function(err){
			if(!err){
				return res.redirect('/articles/' + article._id);
			}
		})
	})
}

exports.destroy= function(req, res){
	Article.load(req.params.id, function(err, article){
		if(err) return res.render('500');
		article.remove(function(err){
			res.redirect('/articles');
		})
	})
}

