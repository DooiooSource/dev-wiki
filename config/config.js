var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , templatePath = path.normalize(__dirname + '/../app/mailer/templates')
 

module.exports = {
  development: {
    db: 'mongodb://localhost/dev-wiki',
    root: rootPath
  },
  test: {
    db: 'mongodb://localhost/dev-wiki'
  },
  production: {
  	db: 'mongodb://localhost/dev-wiki'
  }
}