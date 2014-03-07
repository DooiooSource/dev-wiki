var request = require('request')
	, mongoose = require('mongoose')
	, User = mongoose.model('User')
	, crypto = require('crypto');

exports.login = function (req, res) {
	res.render('user/index', {
		title: 'Login',
        from: req.query.from || ''
	})
}

exports.loginOk = function (req, res) {
	res.render('user/index', {
		title: 'LoginOk'
	})
}

exports.logout = function (req, res) {
	req.session.empNo = null;
	req.session.username = null;

    res.redirect('/');
}

exports.session = function(req, res) {
    console.log(req.query.from);
	var usercode = req.body.empNo;
	var passwordhash = crypto.createHash('md5').update(req.body.password).digest("hex");

	// 本地测试
	/*
	req.session.username = '胡大康';
	req.session.empNo = '90592';

	User.update({empNo: 90592}, {"username": '胡大康', "empNo": 90592}, {"upsert": true}, function (err, numberAffected, raw){
		console.log('The raw response from Mongo was ', raw);
	});
	res.redirect('/');
	*/
	// 本地测试－end
	request({url: 'http://100.dooioo.com:10019/account/loginMd5Pass/'+usercode+'/'+passwordhash, json:true}, function (error, response, body){

		if(body.status === 'ok'){

			request({url:'http://100.dooioo.com:10019/account/info/'+usercode, json:true}, function(error, response, body){
				//写入session
				req.session.username = body.employeeInfo.userName;
				req.session.empNo = usercode;
				// 更新数据库 工号-姓名 
				User.update({empNo: usercode}, {"username": body.employeeInfo.userName, "empNo": usercode}, {"upsert": true}, function (err, numberAffected, raw){});

                if(req.query.from && req.query.from !== 'undefined'){
                    return res.redirect(req.query.from);
                }
				return res.redirect("/");
            });

		}else{
			return res.render('user/index', {title: 'Login', from: '/'});
		}
	});
}