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
	app.get('/logout', users.logout);
	app.post('/session', users.session);


	// app.get('/articles/new', auth.requiresLogin, articles.new);
	var articles = require('../app/controllers/articles');
	app.get('/', articles.index);
	app.get('/articles', articles.index);
	app.get('/articles/new', articles.new);
	app.post('/articles', articles.create);
	app.get('/articles/:id', articles.show);
	app.get('/articles/:id/edit', articles.edit);
	app.put('/articles/:id', articles.update);
	app.del('/articles/:id', articles.destroy);

	app.post('/parsemd', articles.parseMarkdown);
	app.post('/fileupload', articles.fileUpload);

	
	// app.param('id', articles.load);


	var categories = require('../app/controllers/categories')
	app.get('/categories/:category', categories.index);

}