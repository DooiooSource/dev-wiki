'use strict';

angular.module('dwikiApp')
    .controller('SettingsCtrl', function ($scope, $timeout, $location, $http, User, Auth) {
        /*
        var socket = io('http://localhost:9000');
        socket.on('news', function(data){
            showNotification(data);
        });

        */

        $http.get('/api/category').success(function(data){
            $scope.categoryContent = JSON.stringify(data);
            console.log(data);

        });


        $scope.submit = function(){
            $http.put('/api/category', {category: $scope.categoryContent}).success(function(data){
                console.log(data);
            })
        };


        $scope.showPermission = function () {
            Notification.requestPermission(function(permission){

                // Whatever the user answers, we make sure we store the information
                if(!('permission' in Notification)) {
                    Notification.permission = permission;
                }

                if(permission === 'granted') {
                    var notification = new Notification('消息提醒', {
                        icon: 'images/logo.png',
                        body: '匡前阳发表了新文章《技术分享排期》，点击查看。'
                    });
                    notification.onclick = function(){
                        $scope.$apply(function(){
                            $location.path('/article/53d1f61fcfc3dd0000000044');
                        })
                    }
                }
            });
            return;
            socket.emit('my other event', {
                title: 'front',
                body: 'frontbody'
            });
        };

        /*
        $timeout(function(){
            socket.emit('my other event', {
                title: 'front',
                body: 'frontbody'
            });
        }, 5000);
        */


        function showNotification(data){

            if(Notification.permission === 'granted') {
                var notification = new Notification(data.title, {
                    icon: 'images/logo.png',
                    body: data.body
                });
                notification.onclick = function(){
                    $scope.$apply(function(){
                        $location.path('/article/53d1f61fcfc3dd0000000044');
                    })
                }
            }else if(Notification !== "denied"){

                Notification.requestPermission(function(permission){

                    // Whatever the user answers, we make sure we store the information
                    if(!('permission' in Notification)) {
                        Notification.permission = permission;
                    }

                    if(permission === 'granted') {
                        var notification = new Notification(data.title, {
                            icon: 'images/logo.png',
                            body: data.body
                        });
                    }
                });
            }

        }


        /*

        if (window.notifications) {
            console.log("Notifications are supported!");
        }
        else {
            console.log("Notifications are not supported for this Browser/OS version yet.");
        }

            */


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
