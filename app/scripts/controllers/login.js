'use strict';

angular.module('dwikiApp')
    .controller('LoginCtrl', function ($scope, Auth, $location) {
        $scope.user = {};
        $scope.errors = {};

        $scope.login = function (form) {
            if(form.$valid) {
                Auth.login({
                    empNo: $scope.user.empNo,
                    password: $scope.user.password
                }).then(function(data) {
                    $location.path('/');
                }, function(data){
                    alert('工号或密码错误，请重新输入。');
                }).catch (function(err) {
                    err = err.data;
                    $scope.errors.other = err.message;
                });
            }
        };
    });