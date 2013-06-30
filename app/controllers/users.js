exports.login = function (req, res) {
  res.render('user/index', {
    title: 'Login',
    message: req.flash('error')
  })
}