'use strict';

angular.module('dwikiApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
])
    .config(function($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/main',
                controller: 'MainCtrl'
            })
            .when('/login', {
                templateUrl: 'partials/login',
                controller: 'LoginCtrl'
            })
            .when('/signup', {
                templateUrl: 'partials/signup',
                controller: 'SignupCtrl'
            })
            .when('/settings', {
                templateUrl: 'partials/settings',
                controller: 'SettingsCtrl'
//                authenticate: true
            })
            .when('/article/:id', {
                templateUrl: 'partials/article',
                controller: 'ArticleCtrl'
            })
            .when('/article/:id/edit', {
                templateUrl: 'partials/new',
                controller: 'EditCtrl',
                authenticate: true
            })
            .when('/category/:category', {
                templateUrl: 'partials/category',
                controller: 'CategoryCtrl'
            })
            .when('/people/:empNo', {
                templateUrl: 'partials/people',
                controller: 'PeopleCtrl'
            })
            .when('/new', {
                templateUrl: 'partials/new',
                controller: 'NewCtrl',
                authenticate: true
            })
            .when('/dui', {
                templateUrl: 'partials/dui',
                controller: 'DuiCtrl'
            })
            .when('/doc/:name', {
              templateUrl: 'partials/doc',
              controller: 'DocCtrl'
            })
            .when('/search', {
                templateUrl: 'partials/search',
                controller: 'SearchCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);

        // Intercept 401s and redirect you to login
        $httpProvider.interceptors.push(['$q', '$location',
            function($q, $location) {
                return {
                    'responseError': function(response) {
                        if (response.status === 401) {
                            $location.path('/login');
                            return $q.reject(response);
                        } else {
                            return $q.reject(response);
                        }
                    }
                };
            }
        ]);
    })
    .run(function($rootScope, $http, $location, Auth) {

        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$routeChangeStart', function(event, next) {
            // 导航选中状态清空
            $rootScope.currentCategory = '';
            if (next.authenticate && !Auth.isLoggedIn()) {
                $location.path('/login');
            }
        });

        $http.get('/api/category', {
            cache: true
        }).success(function(data) {
            $rootScope.categories = data;
        });
    });