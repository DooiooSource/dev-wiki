
/*!
 * Module dependencies.
 */

var async = require('async')
	, auth = require('./authorization')
	

/**
 * Expose routes
 */
module.exports = function (app) {

	var users = require('../app/controllers/users');		
	app.get('/login', users.login);
    app.post('/login', users.session);
	app.get('/logout', users.logout);


	// app.get('/articles/new', auth.requiresLogin, articles.new);
	var articles = require('../app/controllers/articles');
	app.get('/', articles.index);
	app.get('/articles', articles.index);
	app.get('/articles/new',  auth.requiresLogin, articles.new);
	app.post('/articles',  auth.requiresLogin, articles.create);
	app.get('/articles/:id', articles.show);
	app.get('/articles/:id/edit',  auth.requiresLogin, articles.edit);
	app.put('/articles/:id', auth.requiresLogin, articles.update);
	app.del('/articles/:id', auth.requiresLogin, articles.destroy);
	app.get('/search', articles.search);

	app.get('/user/:empNo', articles.userhome);
	app.post('/fileupload', articles.fileUpload);

	// 路由参数预处理
	app.param('id', articles.load);

	// 评论
	var comments = require('../app/controllers/comments');
	app.post('/articles/:id/comments', auth.requiresLogin, comments.create);
	app.get('/articles/:id/comments', auth.requiresLogin, comments.create);

	var categories = require('../app/controllers/categories')
	app.get('/categories/:category', categories.index);
}