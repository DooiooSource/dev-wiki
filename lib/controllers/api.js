'use strict';

var busboy = require('connect-busboy'),
	path = require('path'),
	fs = require('fs'),
    request = require('request');




var category = require('../config/category');

exports.category = function (req, res) {
  res.json(category);
}

exports.updateCategory = function (req, res) {
    res.json({
        status: 'ok'
    })
}

exports.upload = function(req, res){

	var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        var timestamp = new Date().getTime();
        fstream = fs.createWriteStream( path.normalize(__dirname + '../../../app/upload/') + timestamp + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            // res.redirect('back');
            res.json({
              "file_path": "upload/" + timestamp + filename
            })
        });
    });

}

exports.crossget = function(req, res){
    var path = req.query.path;
    request({url: path, json: false}, function (err, response, body) {
        res.send(body);
    });

}

