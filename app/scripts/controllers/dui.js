'use strict';

angular.module('dwikiApp')
    .controller('DuiCtrl', function ($rootScope, $scope, $http) {
        $rootScope.currentCategory = 'dui';

        $http.get('http://dui.dooioo.com/public/demonew/main.json').success(function(data){
            console.log(data);
        });

        $scope.docs =
            [{
                "text": "自动完成",
                "link": "autocomplete"
            }, {
                "text": "组织架构树",
                "link": "tree"
            }, {
                "text": "表单验证",
                "link": "validation"
            }, {
                "text": "日期选择控件",
                "link": "datepicker"
            }, {
                "text": "添加删除行",
                "link": "addremove"
            }, {
                "text": "字段编辑组件",
                "link": "dui_edit"
            }, {
                "text": "Tips组件",
                "link": "tips"
            }, {
                "text": "分页指令",
                "link": "pagenation"
            }, {
                "text": "查询过滤器",
                "link": "search_filter"
            }, {
                "text": "checkbox选择框",
                "link": "checkbox"
            }]


    });
