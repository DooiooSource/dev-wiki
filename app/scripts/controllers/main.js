'use strict';

angular.module('dwikiApp')
    .controller('MainCtrl', function ($scope, $rootScope, $http, $routeParams) {
        $http.get('/api/articles').success(function (data) {
            $scope.articles = data.articles.splice(0, 10);
        });

        $http.get('http://dui.dooioo.com/public/doc/main.json').success(function(data){
            $scope.docs = data;
        });

        $http.get('/api/articles?attr=1').success(function(data){
            $scope.test = data.articles;
        });
    });
