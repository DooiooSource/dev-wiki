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


	var articles = require('../app/controllers/articles')
	app.get('/', articles.index);
	app.get('/articles/new', auth.requiresLogin, articles.new);
	app.get('/articles/:id', articles.show);

}