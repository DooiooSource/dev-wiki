
/**
* 判断是否登录
**/
exports.requiresLogin = function (req, res, next) {
	console.log("requiresLogin");
	if(!req.session.empNo){
		return res.redirect('login');
	} 
	next(); 
}