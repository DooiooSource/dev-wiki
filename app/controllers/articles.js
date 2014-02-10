var mongoose = require('mongoose')
  , Article = mongoose.model('Article')
  , _ = require('underscore')
  , fs = require('fs')
  , path = require('path');

  ObjectId = mongoose.Types.ObjectId;


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
	var perPage = 10;
	var options = {
		perPage: perPage,
		page: page
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



/**
 * 个人主页
 * @param req
 * @param res
 */

exports.userhome = function(req, res){
    var page = (req.param('page') > 0 ? req.param('page') : 1) - 1;
    var perPage = 10;

	var User = mongoose.model('User');

    User.find({empNo: req.params.empNo}).exec(function(err, user){
        var options = {
            perPage: perPage,
            page: page,
            criteria: {
	            user: user[0]._id
            }
        };

        Article.list(options, function(err, articles){
            if(err) return res.render('500');
            Article.count({user: user[0]._id}).exec(function(err, count){
	            res.render('articles/index', {
	                title: "首页",
	                articles: articles,
	                page: page + 1,
	                pages: Math.ceil(count / perPage),
	                navcate: 'index'
	            });
	        })
        });
    });

};



exports.search = function (req, res) {
	// { $or:[ {'_id':objId}, {'name':param}, {'nickname':param} ]}
	var keyword = req.param('keyword');
	// var criteria = { $or: [ {title: new RegExp('^'+ keyword +'$', "i")}] }
	var criteria = { title: new RegExp('.*'+ keyword +'.*', "i")}
	var page = (req.param('page') > 0 ? req.param('page') : 1) - 1;
	var perPage = 8;
	var options = {
		perPage: perPage,
		page: page,
		criteria: criteria
	}

	Article.list(options, function(err, articles){
		if(err) return res.render('500');
		Article.count(criteria).exec(function(err, count){
			res.render('articles/index', {
				title: "搜索",
				articles: articles,
				page: page + 1,
				pages: Math.ceil(count / perPage),
                keyword: keyword
			});
		})
	});
}

/**
 * New article
 */

exports.new = function(req, res){
	var mockArticle = {
		id: '',
		category: '',
		body: '',
		title: ''
	}
	res.render('articles/editpage', {title: "发布", article: mockArticle});
}

/**
 * Create an article
 */

exports.create = function(req, res){
	var article = new Article(req.body);
    User = mongoose.model('User');
    User
    .findOne({empNo: req.session.empNo})
	.exec(function(err, user){
		article.user = user._id;
		article.save(function(err){
			if(!err){
				return res.redirect('/articles/' + article._id);
			}
			res.render('articles/new',{
				article: article
			});
		})
	})
}

/**
 * Edit an article
 */

exports.edit = function(req, res){
	res.render('articles/editpage', {article: req.article});
}

/**
 * Update an article
 */

exports.update = function(req, res){
	Article.load(req.params.id, function(err, article){
		if(err) return res.render('500');
		article = _.extend(article, req.body);
        // 暂时去除更新者字段
//		article.updater.push(req.session.empNo);
//        article.updater = _.uniq(article.updater);
		article.save(function(err){
			if(!err){
				res.redirect('/articles/' + article._id);
			}
		});
	});
}

/**
 * Show an article
 */

exports.show = function(req, res){    
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

