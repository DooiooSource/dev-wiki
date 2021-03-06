'use strict';

var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose');

/**
 * Main application file
 */

// Set default node environment to development
console.log(process.env.NODE_ENV)
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./lib/config/config');
var db = mongoose.connect(config.mongo.uri, config.mongo.options);

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  if (/(.*)\.(js$|coffee$)/.test(file)) {
    require(modelsPath + '/' + file);
  }
});

// Populate empty DB with sample data
// require('./lib/config/dummydata');

// Passport Configuration
var passport = require('./lib/config/passport');

// Setup Express
var app = express();
var server = require('http').Server(app);
require('./lib/config/express')(app);
require('./lib/routes')(app);

//var io = require('socket.io')(server);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %s:%d, in %s mode', config.ip, config.port, app.get('env'));
});


/*
io.on('connection', function(socket){
    socket.on('my other event', function(data){
        console.log(data);
        socket.emit('news', {title: 'back', body: 'backbody'});
    })
});
*/

// Expose app
exports = module.exports = app;
