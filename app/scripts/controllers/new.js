'use strict';

angular.module('dwikiApp')
    .controller('NewCtrl', function($scope, $http, $routeParams, $q, $location) {

        //从localStorage中获取相关数据
        var params = window.localStorage && window.localStorage.getItem("new");
        params = JSON.parse(params);

        $scope.params = params || {
            title: '',
            html: '',
            category: '',
            tags: []
        };

        //内容改变时，把数据重新到localStorage中
        $scope.$watch('params',function(newVal, oldVal){
            window.localStorage.new = JSON.stringify($scope.params);
        },true);

        $scope.$watch('params.category', function(newVal, oldVal){
            if(newVal === oldVal) return;
            for(var i = 0; i < $scope.categories.length; i++){
                var item = $scope.categories[i];
                if(item.name == $scope.params.category){
                    $scope.tagList = item.tags;
                    return;
                }
            }
        });

        var newEditor = new Simditor({
            textarea: $('#htmlEditor'),
            placeholder: '',
            pasteImage: true,
            toolbar: ['title', 'bold', 'italic', 'underline', 'strikethrough', '|', 'ol', 'ul', 'blockquote', 'code', 'table', 'link', 'image', 'hr', 'indent', 'outdent'],
            defaultImage: 'assets/images/image.png',
            upload: {
                url: '/api/upload'
            },
            markdown: true
        });

        //把以前编辑内容写到编辑器中
        newEditor.setValue($scope.params.html);

        //监听编辑器内容的改变
        newEditor.on('valuechanged',function(){
            var html = newEditor.getValue();
            $scope.$apply(function(){
                $scope.params.html = html;
            });
        });


        $scope.submit = function() {
            $scope.params.html = newEditor.getValue();
            if(angular.isString($scope.params.tags)){
                $scope.params.tags = $scope.params.tags.split(',');
            };
            $http.post('/api/articles', $scope.params).success(function(data) {
                if(data.status == 'ok'){
                    //清空定时器，清除本地文档
                    window.localStorage.removeItem("new");
                    $location.path('/article/' + data.articleId);
                }
            });
        };
    });
