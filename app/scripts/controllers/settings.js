'use strict';

angular.module('dwikiApp')
    .controller('SettingsCtrl', function ($scope, $timeout, $location, $http, User, Auth) {

        $http.get('/api/category').success(function(data){
            $scope.categoryContent = JSON.stringify(data);
            console.log(data);

        });


        $scope.submit = function(){
            $http.put('/api/category', {category: $scope.categoryContent}).success(function(data){
                console.log(data);
            })
        };


        /*
        $scope.errors = {};

        $scope.changePassword = function (form) {
            $scope.submitted = true;

            if (form.$valid) {
                Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
                    .then(function () {
                        $scope.message = 'Password successfully changed.';
                    })
                    .catch(function () {
                        form.password.$setValidity('mongoose', false);
                        $scope.errors.other = 'Incorrect password';
                    });
            }
        };
        */
    });
