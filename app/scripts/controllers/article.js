'use strict';

angular.module('dwikiApp')
    .controller('ArticleCtrl', function($scope, $rootScope, $http, $routeParams, $sce, $timeout, $location) {
        $http.get('/api/showArticle/' + $routeParams.id).success(function(data) {
            data.html = $sce.trustAsHtml(data.html);
            $scope.article = data;
            $rootScope.currentCategory = data.category;
        });

        $timeout(function(){
            $('#toc').toc({
                'selector': 'h1,h2',
                'container': '.mdbody'
            });
        }, 250);


        $scope.deleteArticle = function(){
            if(!confirm('文章删除后无法恢复，您确定要删除该文章吗？')){
                return;
            }
            $http.delete('/api/article/'+$routeParams.id).success(function(data){
                if(data.status == 'ok'){
                    $location.path('/');
                }else{
                    alert('删除失败');
                }
            });
        };

        $scope.commentContent = '';
        /**
         * 添加评论
         */
        $scope.comment = function (form) {
            $scope.submitted = true;

            var params = {
                articleId: $routeParams.id,
                content: $scope.commentContent,
                empNo: $scope.currentUser.empNo
            };

            if (form.$valid) {
                $http.post('/api/comments', params).success(function(data){
                    console.log(data);
                    if(data.status == 'fail'){
                        alert(data.message);
                    }else{
                        $scope.commentContent = '';
                        // 更新评论
                        $http.get('/api/showArticle/' + $routeParams.id).success(function(data) {
                            $scope.article.comments = data.comments;
                        });
                    }
                })
            }
        };
    });