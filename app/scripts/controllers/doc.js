'use strict';

angular.module('dwikiApp')
    .controller('DocCtrl', function($rootScope, $scope, $http, $routeParams, $sce) {

        $rootScope.currentCategory = 'dui';
        $scope.mainlink = 'http://dui.dooioo.com/public/demonew/' + $routeParams.name + '/main.json';

        $scope.pluginName = '';

        /*
         * 获取组件数据
         */
        $http.get($scope.mainlink).success(function(data){
            console.info('返回数据：', data);
            $scope.demoshowList = data.demoshow;
        });


        /**
         * 评论
         */
        $scope.commentContent = '';
        $scope.comment = function (form) {
            $scope.submitted = true;

            var params = {
                linkTo: $routeParams.name,
                body: $scope.commentContent,
                empNo: $scope.currentUser.empNo
            };

            if (form.$valid) {
                $http.post('/api/feedbacks', params).success(function(data){
                    if(data.status == 'fail'){
                        alert(data.message);
                    }else{
                        $scope.commentContent = '';
                        // 更新评论
                        $http.get('/api/feedbacks?linkTo=' + $routeParams.name).success(function(data) {
                            $scope.feedbacks = data;
                        });
                    }
                })
            }
        };
        $http.get('/api/feedbacks?linkTo=' + $routeParams.name).success(function(data) {
            $scope.feedbacks = data;
        });

    });
