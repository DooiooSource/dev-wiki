/**
 * Module dependencies.
 */

 var mongoose = require('mongoose')
 , Article = mongoose.model('Article')

/**
 * List items by categories
 */

 exports.index = function (req, res) {
 	var criteria = {category: req.params.category};
 	var perPage = 8;
	var page = (req.param('page') > 0 ? req.param('page') : 1) - 1;
 	var options = {
 		perPage: perPage,
 		page: page,
 		criteria: criteria
 	};
 	Article.list(options, function(err, articles){
        if (err) return res.render('500')
        Article.count(criteria).exec(function(err, count){
        	res.render('articles/index', {
        		articles: articles,
				page: page + 1,
				pages: Math.ceil(count / perPage)
        	});
        });
 	});
}