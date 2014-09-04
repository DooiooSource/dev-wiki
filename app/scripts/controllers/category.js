'use strict';

angular.module('dwikiApp')
    .controller('CategoryCtrl', function($scope,$rootScope, $http, $routeParams) {
        $rootScope.currentCategory = $routeParams.category;
        $rootScope.currentTag = $routeParams.tags || '';
        $scope.currentPage = $routeParams.page || 1;
        $http.get('/api/articles', {
            params: {
                page: $scope.currentPage,
                category: $routeParams.category,
                tags: $routeParams.tags
            }
        }).success(function(data) {
            $scope.articles = data.articles;
            $scope.pageCount = data.pages;
        });

        angular.forEach($scope.categories, function(c){
            if(c.name === $routeParams.category){
                $scope.tags = c.tags;
            }
        });
    });
