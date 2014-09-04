'use strict';

angular.module('dwikiApp')
    .controller('SearchCtrl', function($scope,$rootScope, $http, $routeParams) {
        $scope.keyword = $routeParams.keyword;
        $scope.currentPage = $routeParams.page || 1;
        $http.get('/api/search', {
            params: {
                page: $scope.currentPage,
                keyword: $scope.keyword
            }
        }).success(function(data) {
            $scope.articles = data.articles;
            $scope.pageCount = data.pages;
        });
    });
