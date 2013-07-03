/*!
 * Module dependencies.
 */

var async = require('async')
	, auth = require('./authorization')
	

/**
 * Expose routes
 */
module.exports = function (app) {

	// home route	
	var users = require('../app/controllers/users');		
	app.get('/login', users.login);
	app.get('/logout', users.logout);
	app.post('/session', users.session);


	// app.get('/articles/new', auth.requiresLogin, articles.new);
	var articles = require('../app/controllers/articles')
	app.get('/articles', articles.index);
	app.get('/articles/new', articles.new);
	app.post('/articles', articles.create);
	app.get('/articles/:id', articles.show);

	app.param('id', articles.load);

}