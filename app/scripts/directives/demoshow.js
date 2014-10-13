/**
 * Created by welkang on 14-7-31.
 * 支持iframe显示文档或demo
 * 根据type字段来区别是显示html还是文档内容
 */

'use strict';

angular.module('dwikiApp')
    .directive('demoshow', function($timeout, $sce, $http) {
        return {
            restrict: 'AE',
            scope: {
                mainlink: '=',
                title: '@',
                datasource: '='
            },
            templateUrl: 'partials/demoshow.html',
            link: function (scope, element, attrs) {

                scope.initData = {
                    currentIndex: '-1'
                };

                console.log(scope.datasource);
                scope.changeTag = function(d, i){
                    scope.initData.currentIndex = i;
                    scope.currentIframeUrl = $sce.trustAsResourceUrl(d.path);

                    /*
                     $http.get(d.path, {cache: false}).success(function(data){
                     var content = '';
                     if(d.type === 'md'){
                     content = marked(data);
                     }else{
                     content = hljs.highlightAuto(data).value
                     }
                     demo.content = $sce.trustAsHtml(content);
                     })
                     */
                };
                scope.changeTag(scope.datasource.filelist[0], 0);


                /*
                marked.setOptions({
                    gfm: true,
                    tables: true,
                    breaks: false,
                    pedantic: false,
                    sanitize: true,
                    smartLists: true,
                    smartypants: false,
                    highlight: function (code) {
                        return hljs.highlightAuto(code).value;
                    }
                });

                if(scope.mainlink){
                    $http.get(scope.mainlink).success(function(data){
                        console.log(data);
                        // iframe引用url处理
                        angular.forEach(data.demoshow, function(item){
                            item.iframeUrl = $sce.trustAsResourceUrl(item.filelist[0].path);
                        });
                        scope.$parent.pluginName = data.title;
                        scope.demoshow = data.demoshow;

                        scope.currentIframeUrl = $sce.trustAsResourceUrl(d.path);
                    });
                }
                */




            }
        };
    });
