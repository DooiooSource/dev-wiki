var mongoose = require('mongoose');

exports.index = function (req, res) {

	res.render('articles/treemanage', {
		title: "树管理"
		
	})


}