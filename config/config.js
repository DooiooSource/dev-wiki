var path = require('path')
  , rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development: {
    db: 'mongodb://127.0.0.1/dev-wiki',
    root: rootPath
  },
  test: {
    db: 'mongodb://127.0.0.1/dev-wiki',
    root: rootPath
  },
  production: {
  	db: 'mongodb://192.168.0.133:27017/dev-wiki',
  	root: rootPath
  }
}