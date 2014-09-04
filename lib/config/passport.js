'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    request = require('request'),
    crypto = require('crypto');


/**
 * Passport configuration
 */
passport.serializeUser(function (user, done) {
    done(null, user.empNo);
});

passport.deserializeUser(function (empNo, done) {
    User.findOne({ empNo: empNo }, '-_id', function (err, user) {
        done(err, user);
    });
});

// add other strategies for more authentication flexibility
passport.use(new LocalStrategy({
        usernameField: 'empNo',
        passwordField: 'password' // this is the virtual field on the model
    },
    function (empNo, password, done) {
        // 无法连接内部网络时请求
        // return done(null, {"username": "胡大康", "empNo": empNo});

        var passwordhash = crypto.createHash('md5').update(password).digest("hex");

        request({url: 'http://100.dooioo.com:10019/account/loginMd5Pass/' + empNo + '/' + passwordhash, json: true}, function (err, response, body) {
            if (err) return done(err);

            if (body.status === 'ok') {
                request({url: 'http://100.dooioo.com:10019/account/info/' + empNo, json: true}, function (err, response, body) {
                    // 更新数据库 工号-姓名
                    User.update({"empNo": empNo}, {"username": body.employeeInfo.userName, "empNo": empNo}, {"upsert": true}, function (err, numberAffected, raw) {
                        console.log(numberAffected + ' record be modified.');
                    });
                    return done(null, {"username": body.employeeInfo.userName, "empNo": empNo});
                });
            } else {
                return done(null, false, {
                    message: 'This password is not correct.'
                });
            }
        })
    }
));

module.exports = passport;
