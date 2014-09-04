/**
 *
 * Created by welkang on 14-8-13.
 */

var mongoose = require('mongoose'),
    Article = mongoose.model('Article'),
    User = mongoose.model('User');

exports.create = function (req, res) {

    Article.findById(req.body.articleId, function(err, a){

        User.findOne({empNo: req.body.empNo})
            .exec(function(err, user){
                a.addComment(user._id, req.body.content, function (err) {
                    if (err) {
                        res.json({
                            status: 'fail',
                            message: '添加评论失败'
                        })
                    }else{
                        res.json({
                            status: 'ok',
                            message: '评论添加成功'
                        })
                    }
                })

            });

    })
};
