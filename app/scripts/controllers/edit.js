'use strict';

angular.module('dwikiApp')
    .controller('EditCtrl', function($scope, $http, $location, $routeParams) {

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

        $http.get('/api/article/' + $routeParams.id).success(function(data) {

            if(angular.isArray(data.tags)){
                data.tags = data.tags.join(',');
            }

            $scope.params = {
                title: data.title,
                html: data.html,
                category: data.category,
                tags: data.tags,
                updatedAt: (new Date(data.updatedAt)).getTime(),
                attr:data.attr
            };


            $scope.cateText = data.category;
            newEditor.setValue(data.html);

            var c = getCateByKey('name', $scope.params.category);
            $scope.showTags(c);

        });

        function getCateByKey(key, value){
            var obj = {};
            var cates = $scope.categories;
            for (var i = cates.length - 1; i >= 0; i--) {
                if(value === cates[i][key]){
                    obj = cates[i];
                    break;
                }
            };
            return obj;
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


        $scope.setCategory = function(c) {
            $scope.cateText = c.text;
            $scope.params.category = c.name;
            $scope.ctags = c.tags;
            $scope.params.tags = [];
            $scope.showTags(c);
        }


        $scope.showTags = function(c) {
            $scope.ctags = c.tags;
        }


        $scope.setTag = function(tag){
            if(!$scope.haveTag(tag)){
                $scope.params.tags.push(tag);
            }
        }

        $scope.toggleTag = function(tag){
            var index = $scope.params.tags.indexOf(tag);
            if(index >= 0){
                $scope.params.tags.splice(index, 1);
            }else{
                $scope.params.tags.push(tag);
            }
        }

        $scope.haveTag = function(t){
            if($scope.params.tags.indexOf(t) >= 0){
                return true
            }
            return false;
        }

        $scope.submit = function() {
            $scope.params.html = newEditor.getValue();
            $http.put('/api/article/' + $routeParams.id, $scope.params).success(function(data) {
                if(data.status == 'ok'){
                    $location.path('/article/' + data.articleId);
                }else{
                    alert(data.message);
                }
            })
        };
    });
