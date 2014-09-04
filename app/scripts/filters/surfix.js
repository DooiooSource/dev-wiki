'use strict';

angular.module('dwikiApp')
    .filter('surfix', function($http, $rootScope) {
        return function(path) {
            var arr = path.split('/');
            return arr[arr.length -1];
        };

    });
