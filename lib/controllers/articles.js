'use strict';

var mongoose = require('mongoose'),
    marked = require('marked'),
    Article = mongoose.model('Article');

marked.setOptions({
//     renderer: new marked.Renderer(),
     gfm: true,
     tables: true,
     breaks: true,
//     pedantic: false,
//     sanitize: false,
     smartLists: true,
     smartypants: true
});

/**
 * 批量处理数据
 */
exports.mdToHtml = function(req, res){
    Article.update({}).exec(function(err, data){
        for (var i = 0; i< data.length; i++){
            data[i].updatedAt = data[i].createdAt;
            if(!data[i].html){
                data[i].html = marked(data[i].body);
                data[i].body = '';
            }
            data[i].save();
        }
        res.json({
            status: 'ok'
        });
    })
};


/** 
 * show
 **/
exports.show = function(req, res) {
    Article.findOne({
        _id: req.params.id
    })
        .populate('user', 'username empNo')
        .populate('updater', 'username empNo')
        .populate('comments.user', 'username empNo')
        .exec(
            function(err, data) {
                res.json(data);
            });


};

/**
 * Fetch an article from db
 **/
exports.load = function(req, res) {
    Article.findOne({
        _id: req.params.id
    }, function(err, data) {
        res.json(data);
    });
};




/** 
 * List
 **/

var category = require('../config/category');
exports.index = function(req, res) {

    var page = (req.query.page > 0 ? req.query.page : 1) - 1;
    var perPage = 15;
    var paramsForCount = req.query;
    paramsForCount.status = 1;
    delete paramsForCount.page;
    if(req.query.tags){
        paramsForCount.tags = {$all: paramsForCount.tags.split(',')}
    }

    var paramsForPage = {
        perPage: perPage,
        page: page,
        criteria: paramsForCount
    };

    Article.list(paramsForPage, function(err, articles) {
        Article.count(paramsForCount).exec(function(err, count) {
            res.json({
                articles: articles,
                pages: Math.ceil(count / perPage)
            })
        })
    });

    /*
    var articleArr = [];
    var i = 0;

    function pushCates() {
        Article.find({
            category: category[i].name,
            status: 1
        }, '-body')
            .populate('user', 'username empNo')
            .populate('updater', 'username empNo')
            .sort({
                'createdAt': -1
            })
            .limit(5)
            .exec(function(err, articles) {
                if (!err) {
                    if (i < category.length) {
                        articleArr.push({
                            cateText: category[i].text,
                            cateName: category[i].name,
                            articles: articles
                        });
                        if (i == category.length - 1) {
                            res.json({
                                articleArr: articleArr
                            });
                            return;
                        }
                        i++;
                        pushCates();
                    }

                }
            });
    }

    pushCates();
    */
};


/**
 * Find by Category Name
 **/
exports.findByProperty = function(req, res) {
    var page = (req.query.page > 0 ? req.query.page : 1) - 1;
    var perPage = 15;
    var paramsForCount = req.query;
    paramsForCount.status = 1;
    delete paramsForCount.page;
    if(req.query.tags){
        paramsForCount.tags = {$all: paramsForCount.tags.split(',')}
    }

    var paramsForPage = {
        perPage: perPage,
        page: page,
        criteria: paramsForCount
    };

    Article.list(paramsForPage, function(err, articles) {
        Article.count(paramsForCount).exec(function(err, count) {
            res.json({
                articles: articles,
                pages: Math.ceil(count / perPage)
            })
        })
    });

};


/**
 * 个人主页
 * (自己查看自己主页时需要显示草稿箱中的文档)
 */
exports.findArticlesByEmpNo = function(req, res){

    var page = (req.query.page > 0 ? req.query.page : 1) - 1;
    var perPage = 15;
    var User = mongoose.model('User');

    User.find({empNo: req.params.empNo}).exec(function(err, user){
        var theUser  = user[0];
        var paramsForCount = {
            user: theUser._id
        };
        var paramsForPage = {
            perPage: perPage,
            page: page,
            criteria: paramsForCount
        };

        Article.list(paramsForPage, function(err, articles){

            Article.count(paramsForCount).exec(function(err, count){
                res.json({
                    articles: articles,
                    pages: Math.ceil(count / perPage),
                    user: theUser
                })
            });

        });

    })
};


/**
 * Create an article
 */

exports.create = function(req, res) {
    var article = new Article(req.body);

    var User = mongoose.model('User');
    User
        .findOne({
            empNo: req.user.empNo
        })
        .exec(function(err, user) {
            article.user = user._id;
            article.save(function(err, data) {
                if (!err) {
                    res.json({
                        status: 'ok',
                        articleId: data.id
                    })
                } else {
                    res.json({
                        status: 'fail'
                    })
                }
            })
        })
};

/**
 * Update an article
 */

exports.update = function(req, res) {

    var User = mongoose.model('User');

    Article.findOne({_id: req.params.id})
        .exec(function(err, at){
            // 传入的更新日期要等于数据库最后更新日期，否则数据过期
            if( req.body.updatedAt === (new Date(at.updatedAt)).getTime() ){
                User.findOne({
                        empNo: req.user.empNo
                    })
                    .exec(function(err, user) {
                        req.body.updater = user._id;
                        req.body.updatedAt = new Date();
                        Article.findOneAndUpdate({
                                _id: req.params.id
                            },
                            req.body, function(err, data) {
                                res.json({
                                    status: "ok",
                                    articleId: data.id
                                })
                            })
                    })
            }else{
                res.json({
                    stats: 'fail',
                    message: '数据已过期，请保存好本地文章，刷新后编辑并提交。'
                })
            }
        });
};

/**
 * Add Comments
 */






/**
 * Delete an article physically
 */

exports.physicalDestroy = function(req, res) {

    Article.findOneAndRemove({
        _id: req.params.id
    }, function() {
        res.json({
            status: "ok"
        })
    })

};

/**
 * Set status of article
 */
exports.destroy = function (req, res) {
    Article.findByIdAndUpdate(req.params.id, { $set: { status: -1 }}, {}, function(err){
        if(!err){
            res.json({
                status: "ok"
            })
        }
    })
};

/**
 * Search
 */

exports.search = function (req, res) {
    // { $or:[ {'_id':objId}, {'name':param}, {'nickname':param} ]}
    var keyword = req.param('keyword');
    // var criteria = { $or: [ {title: new RegExp('^'+ keyword +'$', "i")}] }
    var criteria = {$or: [{title: new RegExp('.*'+ keyword +'.*', "i")}, {category: new RegExp('.*'+ keyword +'.*', "i")}]};
    var page = (req.param('page') > 0 ? req.param('page') : 1) - 1;
    var perPage = 15;
    var options = {
        perPage: perPage,
        page: page,
        criteria: criteria
    };

    Article.list(options, function(err, articles){
        if(err) return res.render('500');
        Article.count(criteria).exec(function(err, count){
            res.json({
                articles: articles,
                pages: Math.ceil(count / perPage)
            })
        })
    });
};
