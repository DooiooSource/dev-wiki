/**
 * Created by welkang on 14-10-11.
 */

'use strict';

var mongoose = require('mongoose'),
    Feedback = mongoose.model('Feedback');

/**
 * show
 **/
exports.show = function(req, res) {
    console.log(req.query.linkTo)
    Feedback.find({
        linkTo: req.query.linkTo
    })
        .populate('user', 'username empNo')
        .exec(
        function(err, data) {
            res.json(data);
        });

};


/**
 * create
 **/

/**
 * Create an article
 */

exports.create = function(req, res) {
    var feedback = new Feedback(req.body);

    var User = mongoose.model('User');
    User
        .findOne({
            empNo: req.user.empNo
        })
        .exec(function(err, user) {
            feedback.user = user._id;
            feedback.save(function(err, data) {
                if (!err) {
                    res.json({
                        status: 'ok'
                    })
                } else {
                    res.json({
                        status: 'fail'
                    })
                }
            })
        })
};