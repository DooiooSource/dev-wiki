var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')

module.exports = {
  development: {
    db: 'mongodb://localhost/dev-wiki',
    root: rootPath
  },
  test: {
    db: 'mongodb://localhost/dev-wiki',
    root: rootPath
  },
  production: {
  	db: 'mongodb://localhost/dev-wiki',
  	root: rootPath
  }
}