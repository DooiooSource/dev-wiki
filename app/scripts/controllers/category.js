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
            data.articles.forEach(function(item, index){
                if(item.comments && item.comments.length > 0){
                    item.lastComment = item.comments[item.comments.length -1];
                }
            });
            $scope.articles = data.articles;
            console.log($scope.articles)
            $scope.pageCount = data.pages;
        });

        angular.forEach($scope.categories, function(c){
            if(c.name === $routeParams.category){
                $scope.tags = c.tags;
            }
        });
    });
