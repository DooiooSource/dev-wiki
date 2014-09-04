'use strict';

angular.module('dwikiApp')
    .controller('NewCtrl', function($scope, $http, $routeParams, $q, $location) {

        $scope.params = {
            title: '',
            html: '',
            category: '',
            tags: []
        };

        $scope.tagList = [];

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

        $scope.submit = function() {
            $scope.params.html = newEditor.getValue();
            if(angular.isString($scope.params.tags)){
                $scope.params.tags = $scope.params.tags.split(',');
            };
            $http.post('/api/articles', $scope.params).success(function(data) {
                if(data.status == 'ok'){
                    $location.path('/article/' + data.articleId);
                }
            })
        };
    });
