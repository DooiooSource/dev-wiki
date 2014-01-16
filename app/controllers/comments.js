var mongoose = require('mongoose');

exports.create = function (req, res) {

	if (!req.body.body) return res.redirect('/articles/'+ article.id)


	var article = req.article;
	// var user = req.user;
	User = mongoose.model('User');
    User
    .findOne({empNo: req.session.empNo})
	.exec(function(err, user){
		article.addComment(user._id, req.body, function (err) {
			if (err) return res.render('500')
			res.redirect('/articles/'+ article.id)
		})

	})
}