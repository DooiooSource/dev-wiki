/**
 * Created by welkang on 14-7-31.
 */

'use strict';

angular.module('dwikiApp')
    .directive('demoshow', function($timeout, $sce, $http) {
        return {
            restrict: 'AE',
            scope: {
                mainlink: '=',
                title: '@'
            },
            templateUrl: 'partials/demoshow.html',
            link: function (scope, element, attrs) {


                scope.initData = {
                    currentShow: 'demo',
                    currentIndex: '-1'
                }

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
                    $http.get('/api/crossget?path=' + scope.mainlink).success(function(data){
                        // iframe引用url处理
                        angular.forEach(data.demoshow, function(item){
                            item.iframeUrl = $sce.trustAsResourceUrl(item.filelist[0].path);
                        });
                        scope.$parent.pluginName = data.title;
                        scope.demoshow = data.demoshow;
                    });
                }

                scope.changeTag = function(d, demo, i){
                    demo.currentIndex = i;
                    demo.currentShow = 'code';
                    $http.get('/api/crossget?path=' + d.path, {cache: false}).success(function(data){
                        var content = '';
                        if(d.type === 'md'){
                            content = marked(data);
                        }else{
                            content = hljs.highlightAuto(data).value
                        }
                        demo.content = $sce.trustAsHtml(content);
                    })
                }
                
            }
        };
    });
