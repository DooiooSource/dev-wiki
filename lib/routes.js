'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    articles = require('./controllers/articles'),
    comments = require('./controllers/comments'),
    feedbacks = require('./controllers/feedbacks'),
    session = require('./controllers/session'),
    middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function (app) {

    app.route('/api/mdToHtml').get(articles.mdToHtml);

    app.route('/api/category')
        .get(api.category)
        .put(api.updateCategory);

    app.route('/api/index')
        .get(articles.index);

    app.route('/api/articles')
        .get(articles.findByProperty)
        .post(articles.create);

    app.route('/api/people/:empNo')
        .get(articles.findArticlesByEmpNo);

    app.route('/api/article/:id')
        .get(articles.load)
        .put(articles.update)
        .delete(articles.destroy);

    // 获取处理过的文章数据
    app.route('/api/showArticle/:id')
        .get(articles.show);

    app.route('/api/search')
        .get(articles.search);

    app.route('/api/session')
        .post(session.login)
        .delete(session.logout);

    app.route('/api/upload')
        .post(api.upload);

    app.route('/api/crossget')
        .get(api.crossget);

    // Post Comments to Article
    app.route('/api/comments')
        .post(comments.create);

    app.route('/api/feedbacks')
        .post(feedbacks.create)
        .get(feedbacks.show);


    // All undefined api routes should return a 404
    app.route('/api/*')
        .get(function (req, res) {
            res.send(404);
        });

    // All other routes to use Angular routing in app/scripts/app.js
    app.route('/partials/*')
        .get(index.partials);
    app.route('/*')
        .get(middleware.setUserCookie, index.index);
};