'use strict';

angular.module('dwikiApp')
    .controller('NavbarCtrl', function($rootScope, $scope, $http, $location, $route, Auth) {

        $http.get('/api/category', {
            cache: true
        }).success(function(data) {
            $scope.menu = data;
        });

        $scope.logout = function() {
            Auth.logout()
                .then(function() {
                    $location.path('/');
                });
        };

        $scope.isActive = function(route) {
            return route == $rootScope.currentCategory;
        };

        $scope.user = {};
        $scope.errors = {};
        $scope.login = function(form) {

            if(form.$valid) {
                Auth.login({
                    empNo: $scope.user.empNo,
                    password: $scope.user.password
                }).then(function(data) {
                    $route.reload();
                }, function(data){
                    alert('工号或密码错误，请重新输入。');
                }).catch (function(err) {
                    err = err.data;
                    $scope.errors.other = err.message;
                });
            }
        };

        $scope.search = function(){
            if($scope.keyword){
                $location.path('/search').search('keyword', $scope.keyword);
            }
        }
    });
