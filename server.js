
/**
 * Module dependencies.
 */

var express = require('express'),
	fs = require('fs');
    moment = require('moment');


var env = process.env.NODE_ENV || 'development',
	config = require('./config/config')[env],
	mongoose = require('mongoose');

// Bootstrap db connection
mongoose.connect(config.db);

// Bootstrap models
var models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function (file) {
	if (~file.indexOf('.js')) require(models_path + '/' + file)
});

var app = express();

var ejs = require('ejs');

ejs.filters.parse_category = function(obj){
    switch(obj){
        case "frontend":
        return "前端";
        case "backend":
        return "后端";
        case "post":
        return "分享";
        case "IDC":
        return "交互";
        case "mobile":
        return "移动";
    }
}
ejs.filters.format_time = function(obj){
	return moment(obj).format('YYYY-MM-DD');
}


// express settings
require('./config/express')(app, config)

// Bootstrap routes
require('./config/routes')(app)


// Start the app by listening on <port>
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express app started on port '+port);

// expose app
exports = module.exports = app