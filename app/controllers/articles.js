var mongoose = require('mongoose')
  , Article = mongoose.model('Article')
  , _ = require('underscore')
  , marked = require('./marked.js')
  , fs = require('fs')
  , path = require('path')


/** 
* Load
**/

exports.load = function(req, res, next, id) {
	var User = mongoose.model('User');

	Article.load(id, function(err, article) {
		if (err) return next(err);
		if (!article) return next(new Error('not fuound'));
		req.article = article;
		next();
	});
}

/** 
* List
**/

exports.index = function (req, res) {
	var page = (req.param('page') > 0 ? req.param('page') : 1) - 1;
	var perPage = 8;
	var options = {
		perPage: perPage,
		page: page,
		criteria: {'status': 'published'}
	}

	Article.list(options, function(err, articles){
		if(err) return res.render('500');
		Article.count().exec(function(err, count){
			res.render('articles/index', {
				title: "首页",
				articles: articles,
				page: page + 1,
				pages: Math.ceil(count / perPage),
				navcate: 'index'
			});
		})
	});
}

exports.search = function (req, res) {
	// { $or:[ {'_id':objId}, {'name':param}, {'nickname':param} ]}
	var keyword = req.param('keyword');
	var criteria = { $or: [ {'tags': keyword}, {title: new RegExp('^'+ keyword +'$', "i")}] }
	var page = (req.param('page') > 0 ? req.param('page') : 1) - 1;
	var perPage = 8;
	var options = {
		perPage: perPage,
		page: page,
		criteria: criteria
	}

	Article.list(options, function(err, articles){
		if(err) return res.render('500');
		Article.count().exec(function(err, count){
			res.render('articles/index', {
				title: "搜索",
				articles: articles,
				page: page + 1,
				pages: Math.ceil(count / perPage)
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
 * Edit an article
 */

exports.edit = function(req, res){
	res.render('articles/edit', {article: req.article});
}

/**
 * Update an article
 */

exports.update = function(req, res){
	Article.load(req.params.id, function(err, article){
		if(err) return res.render('500');
		article = _.extend(article, req.body);
		article.saveit(function(err){
			if(!err){
				return res.redirect('/articles/' + article._id);
			}
		});
	});
}

/**
 * Show an article
 */

exports.show = function(req, res){
	var pattern = /^\#{2}([^\#\n]*)$/gm;
	var str = req.article.body;
	var outline = str.match(pattern) || [];
	outline = _.map(outline, function(num){
		return num.replace(/^\#{2}/g, "");
	})

	req.article.outline = outline;
	req.article.body = marked.parsemd(req.article.body);
	res.render('articles/show', {article: req.article, navcate: req.article.category});
}

/**
 * Delete an article
 */

exports.destroy= function(req, res){
	Article.load(req.params.id, function(err, article){
		if(err) return res.render('500');
		article.remove(function(err){
			res.redirect('/articles');
		})
	})
}

/**
 * Parse Markdown to Html
 */

exports.parseMarkdown = function(req, res){
	var content = marked.parsemd(req.body.postcon);
	res.send(content);
}

/**
 * Recieve upload files
 */

exports.fileUpload = function(req, res){
    var tmp_path = req.files.thumbnail.path;
    fs.readFile(tmp_path, function(err, data){
    	var newPath = "./uploads/photos/"+req.files.thumbnail.name;
    	fs.writeFile(newPath, data, function(err){
			if (err) throw err;
			fs.unlink(tmp_path);
			var imgAlt = req.files.thumbnail.size;
			var imgName = req.files.thumbnail.name;
			
			res.send({"alt":imgAlt, "url":imgName});
    	});
    });
}

