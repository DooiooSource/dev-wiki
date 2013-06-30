/*!
 * Module dependencies.
 */

var async = require('async')

/**
 * Controllers
 */

var users = require('../app/controllers/users')

/**
 * Route middlewares
 */


/**
 * Expose routes
 */

module.exports = function (app) {

	// home route
	app.get('/', users.index)

}