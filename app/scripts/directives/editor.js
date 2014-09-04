'use strict';

angular.module('dwikiApp')
    .directive('editor', function() {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function postLink(scope, element, attrs, ngModel) {


                scope.$watch('params.type', function(oldVal, newVal) {
                    if (oldVal !== newVal) {

                        if (newVal !== 'html') return;

                        var editor = new Simditor({
                            textarea: element,
                            placeholder: '输入正文...',
                            pasteImage: true,
                            toolbar: ['title', 'bold', 'italic', 'underline', 'strikethrough', '|', 'ol', 'ul', 'blockquote', 'code', 'table', 'link', 'image', 'hr', 'indent', 'outdent'],
                            defaultImage: 'assets/images/image.png',
                            upload: {
                                url: '/api/upload'
                            }
                        });

                        editor.on('valuechanged', function(e, src) {
                            scope.$apply(function() {
                                ngModel.$setViewValue(editor.getValue());
                            });
                        });

                        ngModel.$render = function() {
                            editor.setValue(ngModel.$viewValue || '');
                        };


                    }
                })


            }
        };
    });
