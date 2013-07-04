var mongoose = require('mongoose')
  , Article = mongoose.model('Article')
  , _ = require('underscore')
  , marked = require('./marked.js')
  , fs = require('fs')
  , path = require('path')


/** 
* List
**/

exports.index = function (req, res) {

	Article.list(function(err, articles){
		if(err) return res.render('500');
		Article.count().exec(function(err, count){
			res.render('articles/index', {
				title: "首页",
				articles: articles
			});
		})
	});
}

/**
 * New article
 */

exports.new = function(req, res){
	res.render('articles/new', {"title": "发布"});
}

/**
 * Create an article
 */

exports.show = function(req, res){
	Article.load(req.params.id, function(err, article){
		if(err) return res.render('500');
		article.body = marked.parsemd(article.body);;
		res.render('articles/show', {article: article});
	})
}

exports.create = function(req, res){
	var article = new Article(req.body);
	
	article.saveit(function(err){
		if(!err){
			return res.redirect('/articles/' + article._id);
		}
		res.render('/articles/new',{
			article: article
		});
	})

}

exports.edit = function(req, res){
	Article.load(req.params.id, function(err, article){
		if(err) return res.render('500');
		res.render('articles/edit', {article: article});
	})
}

exports.update = function(req, res){
	console.log(req.body);
	Article.load(req.params.id, function(err, article){
		if(err) return res.render('500');
		article = _.extend(article, req.body);
		article.saveit(function(err){
			if(!err){
				return res.redirect('/articles/' + article._id);
			}
		})
	})
}

exports.destroy= function(req, res){
	Article.load(req.params.id, function(err, article){
		if(err) return res.render('500');
		article.remove(function(err){
			res.redirect('/articles');
		})
	})
}


exports.parseMarkdown = function(req, res){
	var content = marked.parsemd(req.body.postcon);
	res.send(content);
}

exports.fileUpload = function(req, res){
    // 获得文件的临时路径
    var tmp_path = req.files.thumbnail.path;
    fs.readFile(tmp_path, function(err, data){
    	var newPath = "./uploads/photos/"+req.files.thumbnail.name;
    	fs.writeFile(newPath, data, function(err){
			if (err) throw err;
			fs.unlink(tmp_path);
			var imgAlt = req.files.thumbnail.size;
			var imgName = req.files.thumbnail.name;
			
			res.send({"alt":imgAlt, "url":imgName});
    	})
    })



  //   // 指定文件上传后的目录 - 示例为"images"目录。 
  //   var target_path = './public/photos/' + req.files.thumbnail.name;

  //   fs.rename(tmp_path, target_path, function(err){
  //   	if(err) throw err;
    	
		// // fs.unlink(tmp_path, function(){
		// 	if (err) throw err;
		// 	var imgAlt = req.files.thumbnail.size
		// 	var imgUrl = target_path;
			
		// 	res.send({"alt":imgAlt, "url":imgUrl});
		// // });
  //   })
}

