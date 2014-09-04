'use strict';

module.exports = {
  env: 'production',
  ip:   process.env.IP || '0.0.0.0',
  port: process.env.PORT || 2000,
  mongo: {
    uri: 'mongodb://192.168.0.133:27017/dev-wiki'
  }
};