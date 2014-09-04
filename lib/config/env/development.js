'use strict';

module.exports = {
  env: 'development',
    port: process.env.PORT || 2000,
  mongo: {
    uri: 'mongodb://localhost/dev-wiki'
  }
};