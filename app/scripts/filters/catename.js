'use strict';

angular.module('dwikiApp')
    .filter('catename', function($http, $rootScope) {
        return function(cateName) {
        	var cateText = '请选择类别';
        	angular.forEach($rootScope.categories, function(item){
        		// console.log(item);
        		if(item.name == cateName){
        			console.log(item.text);
        			cateText = item.text;
        			return;
        		}
        	})

        	return cateText;
        };

    });
