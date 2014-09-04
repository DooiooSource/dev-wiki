'use strict';

angular.module('dwikiApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
