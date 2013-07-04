/**
 * Module dependencies.
 */

 var mongoose = require('mongoose')
 , Article = mongoose.model('Article')

/**
 * List items by categories
 */

 exports.index = function (req, res) {
    var category = req.params.category;
    console.log(category);

    Article.find({category: category}, function (err, articles) {
        if (err) return res.render('500')
        res.render('articles/index', {
            articles: articles
        });
    });
}