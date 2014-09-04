'use strict';

angular.module('dwikiApp')
    .controller('DocCtrl', function($rootScope, $scope, $http, $routeParams, $sce) {

        $rootScope.currentCategory = 'dui';
        $scope.mainlink = 'http://dui.dooioo.com/public/demonew/' + $routeParams.name + '/main.json';

        $scope.pluginName = '';

    });
