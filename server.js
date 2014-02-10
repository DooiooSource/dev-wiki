
/**
 * Module dependencies.
 */

var express = require('express'),
	fs = require('fs'),
    path = require('path'),
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
        case "share":
        return "中心分享";
        case "frontend":
        return "前端";
        case "breakdown":
        return "故障记录";
        case "backend":
        return "后端";
        case "mobile":
        return "移动";
        case "itom":
        return "IT运维";
        default :
        return "无分类";
    }
}
ejs.filters.format_time = function(obj, format){
    if(format){
        return moment(obj).format(format);
    }
	return moment(obj).format('YYYY-MM-DD');
}
ejs.filters.parse_markdown = function(md){
    var pagedown = require("pagedown");
    var converter = new pagedown.Converter();

    var Markdown = require('./config/Markdown.Extra');
    Markdown.Extra.init(converter, {
        extensions: "all",
        highlighter: "prettify"
    });

    return converter.makeHtml(md);
}

// express settings
require('./config/express')(app, config)

// Bootstrap routes
require('./config/routes')(app)

// Record Pid
/*
var pidfile = path.join(__dirname, 'run/app.pid');
fs.writeFileSync(pidfile, process.pid);
process.on('SIGTERM', function(){
    if(fs.existSync(pidfile)){
        fs.unlinkSync(pidfile);
    }
    process.exit(0);
});
*/

// Start the app by listening on <port>
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express app started on port '+port);

// expose app
exports = module.exports = app