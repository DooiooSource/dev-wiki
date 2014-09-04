'use strict';

angular.module('dwikiApp')
    .controller('PeopleCtrl', function ($scope, $http, $routeParams) {

        $scope.currentPage = $routeParams.page || 1;
        $http.get('/api/people/' + $routeParams.empNo, {
            params: {
                page: $scope.currentPage
            }
        }).success(function (data) {
            $scope.articles = data.articles;
            $scope.pageCount = data.pages;
            $scope.user = data.user;
        });

    });