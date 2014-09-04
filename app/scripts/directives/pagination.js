'use strict';

angular.module('dwikiApp')
  .directive('pagination', function ($location, $timeout) {
    return {
      template: '<ul class="pagination">' +
		  '<li ng-class="{\'disabled\': currentPage == 1}"><a href="javascript:;" ng-click="prevPage()">上一页</a></li>' +
		  '<li ng-class="{\'active\': page == currentPage}" ng-repeat="page in pages"><a href="javascript:;" ng-click="selectPage(page)">{{page}}</a></li>'+
		  '<li ng-class="{\'disabled\': currentPage >= pageCount}"><a href="javascript:;" ng-click="nextPage()">下一页</a></li>' +
		'</ul>',
      restrict: 'E',
      scope: {
      	pageCount: "=",
      	currentPage: "="
      },
      link: function postLink(scope, element, attrs) {

      	scope.$watch('pageCount', function(value){
	      	scope.pages = [];
	      	for(var i = 1; i <= value; i++){
	      		scope.pages.push(i);
	      	};
      	});

      	scope.selectPage = function(page){
      		$location.search('page', page);
      	};

      	scope.prevPage = function(){
      		if(scope.currentPage > 1){
	      		$location.search('page', parseInt(scope.currentPage)-1);
      		}
      	};

      	scope.nextPage = function(){
      		if(scope.currentPage < scope.pageCount){
	      		$location.search('page', parseInt(scope.currentPage)+1);
      		}
      	};

      }
    };
  });
