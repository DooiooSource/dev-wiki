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
    });;'use strict';

angular.module('dwikiApp')
    .factory('Auth', function Auth($location, $rootScope, $cookies, Session, User, $cookieStore) {

        function getCookie(name){
            var cname = name + '=';
            var ca = document.cookie.split(';');
            for(var i= 0; i< ca.length; i++){
                var c = ca[i].trim();
                if(c.indexOf(cname) == 0){
                    return c.substring(cname.length, c.length);
                }
            }
            return '';
        }

        /**
         * Get currentUser from cookie
         * 使用$cookieStore中文会出现乱码，所以使用原生的方式获取cookie在解析
         * $rootScope.currentUser = $cookieStore.get('user') || null;
         */
        var userCookie = getCookie('user');
        if(userCookie){
            $rootScope.currentUser = JSON.parse(decodeURIComponent(userCookie));
            $cookieStore.remove('user');
        }

        return {

            /**
             * Authenticate user
             *
             * @param  {Object}   user     - login info
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            login: function (user, callback) {
                var cb = callback || angular.noop;

                return Session.save({
                    empNo: user.empNo,
                    password: user.password
                }, function (user) {
                    $rootScope.currentUser = user;
                    return cb();
                }, function (err) {
                    return cb(err);
                }).$promise;
            },

            /**
             * Unauthenticate user
             *
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            logout: function (callback) {
                var cb = callback || angular.noop;

                return Session.delete(function () {
                        $rootScope.currentUser = null;
                        return cb();
                    },
                    function (err) {
                        return cb(err);
                    }).$promise;
            },


            /**
             * Gets all available info on authenticated user
             *
             * @return {Object} user
             */
            currentUser: function () {
                return User.get();
            },

            /**
             * Simple check to see if a user is logged in
             *
             * @return {Boolean}
             */
            isLoggedIn: function () {
                var user = $rootScope.currentUser;
                return !!user;
            }
        };
    });;'use strict';

angular.module('dwikiApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
;'use strict';

angular.module('dwikiApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id', {
      id: '@id'
    }, { //parameters default
      update: {
        method: 'PUT',
        params: {}
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
;'use strict';

angular.module('dwikiApp')
    .controller('ArticleCtrl', function($scope, $rootScope, $http, $routeParams, $sce, $timeout, $location) {
        $http.get('/api/showArticle/' + $routeParams.id).success(function(data) {
            data.html = $sce.trustAsHtml(data.html);
            $scope.article = data;
            $rootScope.currentCategory = data.category;
        });

        $timeout(function(){
            //执行代码高亮处理
            //console.log(hljs);
            hljs.configure({tabReplace: '    '})
            $('pre').each(function(i, block) {
                hljs.highlightBlock(block);
            });
            /*hljs.configure({classPrefix: 'hljs-'});
            hljs.initHighlightingOnLoad();*/
            /*hljs.configure({classPrefix: 'hljs-',tabReplace: '    '});
            hljs.initHighlightingOnLoad();*/

            //生成右侧导航
            $('#toc').tocPlugin({
                'selectors': 'h2,h3,h4',
                'container': '.mdbody'
            });
        }, 250);

        $scope.deleteArticle = function(){
            if(!confirm('文章删除后无法恢复，您确定要删除该文章吗？')){
                return;
            }
            $http.delete('/api/article/'+$routeParams.id).success(function(data){
                if(data.status == 'ok'){
                    $location.path('/');
                }else{
                    alert('删除失败');
                }
            });
        };

        $scope.commentContent = '';
        /**
         * 添加评论
         */
        $scope.comment = function (form) {
            $scope.submitted = true;

            var params = {
                articleId: $routeParams.id,
                content: $scope.commentContent,
                empNo: $scope.currentUser.empNo
            };

            if (form.$valid) {
                $http.post('/api/comments', params).success(function(data){
                    if(data.status == 'fail'){
                        alert(data.message);
                    }else{
                        $scope.commentContent = '';
                        // 更新评论
                        $http.get('/api/showArticle/' + $routeParams.id).success(function(data) {
                            $scope.article.comments = data.comments;
                        });
                    }
                })
            }
        };


        $scope.scrollTo = function(e){
            e.preventDefault();
            if(e.target.tagName.toLowerCase() === 'a') {
                var aid = $(e.target).attr('href'),
                    top = $(aid).offset().top;
                $(window).scrollTop(top);
            }
        };
    });;'use strict';

angular.module('dwikiApp')
    .controller('CategoryCtrl', function($scope,$rootScope, $http, $routeParams) {
        $rootScope.currentCategory = $routeParams.category;
        $rootScope.currentTag = $routeParams.tags || '';
        $scope.currentPage = $routeParams.page || 1;
        $http.get('/api/articles', {
            params: {
                page: $scope.currentPage,
                category: $routeParams.category,
                tags: $routeParams.tags
            }
        }).success(function(data) {
            data.articles.forEach(function(item, index){
                if(item.comments && item.comments.length > 0){
                    item.lastComment = item.comments[item.comments.length -1];
                }
            });
            $scope.articles = data.articles;
            console.log($scope.articles)
            $scope.pageCount = data.pages;
        });

        angular.forEach($scope.categories, function(c){
            if(c.name === $routeParams.category){
                $scope.tags = c.tags;
            }
        });
    });
;'use strict';

angular.module('dwikiApp')
    .controller('DocCtrl', function($rootScope, $scope, $http, $routeParams, $sce) {

        $rootScope.currentCategory = 'dui';
        $scope.mainlink = 'http://dui.dooioo.com/public/demonew/' + $routeParams.name + '/main.json';

        $scope.pluginName = '';

        /*
         * 获取组件数据
         */
        $http.get($scope.mainlink).success(function(data){
            console.info('返回数据：', data);
            $scope.demoshowList = data.demoshow;
        });


        /**
         * 评论
         */
        $scope.commentContent = '';
        $scope.comment = function (form) {
            $scope.submitted = true;

            var params = {
                linkTo: $routeParams.name,
                body: $scope.commentContent,
                empNo: $scope.currentUser.empNo
            };

            if (form.$valid) {
                $http.post('/api/feedbacks', params).success(function(data){
                    if(data.status == 'fail'){
                        alert(data.message);
                    }else{
                        $scope.commentContent = '';
                        // 更新评论
                        $http.get('/api/feedbacks?linkTo=' + $routeParams.name).success(function(data) {
                            $scope.feedbacks = data;
                        });
                    }
                })
            }
        };
        $http.get('/api/feedbacks?linkTo=' + $routeParams.name).success(function(data) {
            $scope.feedbacks = data;
        });

    });
;'use strict';

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
;'use strict';

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
;'use strict';

angular.module('dwikiApp')
    .controller('LoginCtrl', function ($scope, Auth, $location) {
        $scope.user = {};
        $scope.errors = {};

        $scope.login = function (form) {
            if(form.$valid) {
                Auth.login({
                    empNo: $scope.user.empNo,
                    password: $scope.user.password
                }).then(function(data) {
                    $location.path('/');
                }, function(data){
                    alert('工号或密码错误，请重新输入。');
                }).catch (function(err) {
                    err = err.data;
                    $scope.errors.other = err.message;
                });
            }
        };
    });;'use strict';

angular.module('dwikiApp')
    .controller('MainCtrl', function ($scope, $rootScope, $http, $routeParams) {
        $http.get('/api/articles').success(function (data) {
            $scope.articles = data.articles.splice(0, 10);
        });

        /*$http.get('http://dui.dooioo.com/public/demonew/main.json').success(function(data){
            $scope.docs = data;
        });*/
        $http.get('http://10.8.204.104/workspace/dui/doc/main.json').success(function(data){
            $scope.docs = data;
        });

        $http.get('/api/articles?attr=1').success(function(data){
            $scope.test = data.articles;
        });
    });
;'use strict';

angular.module('dwikiApp')
    .controller('NavbarCtrl', function($rootScope, $scope, $http, $location, $route, Auth) {

        $http.get('/api/category', {
            cache: true
        }).success(function(data) {
            $scope.menu = data;
        });

        $scope.logout = function() {
            Auth.logout()
                .then(function() {
                    $location.path('/');
                });
        };

        $scope.isActive = function(route) {
            return route == $rootScope.currentCategory;
        };

        $scope.user = {};
        $scope.errors = {};
        $scope.login = function(form) {

            if(form.$valid) {
                Auth.login({
                    empNo: $scope.user.empNo,
                    password: $scope.user.password
                }).then(function(data) {
                    $route.reload();
                }, function(data){
                    alert('工号或密码错误，请重新输入。');
                }).catch (function(err) {
                    err = err.data;
                    $scope.errors.other = err.message;
                });
            }
        };

        $scope.search = function(){
            if($scope.keyword){
                $location.path('/search').search('keyword', $scope.keyword);
            }
        }
    });
;'use strict';

angular.module('dwikiApp')
    .controller('NewCtrl', function($scope, $http, $routeParams, $q, $location) {

        //从localStorage中获取相关数据
        var params = window.localStorage && window.localStorage.getItem("new");
        params = JSON.parse(params);

        $scope.params = params || {
            title: '',
            html: '',
            category: '',
            tags: [],
            attr: 0
        };

        //内容改变时，把数据重新到localStorage中
        $scope.$watch('params',function(newVal, oldVal){
            window.localStorage.new = JSON.stringify($scope.params);
        },true);

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

        //把以前编辑内容写到编辑器中
        newEditor.setValue($scope.params.html);

        //监听编辑器内容的改变
        newEditor.on('valuechanged',function(){
            var html = newEditor.getValue();
            $scope.$apply(function(){
                $scope.params.html = html;
            });
        });


        $scope.submit = function() {
            $scope.params.html = newEditor.getValue();
            if(angular.isString($scope.params.tags)){
                $scope.params.tags = $scope.params.tags.split(',');
            };
            $http.post('/api/articles', $scope.params).success(function(data) {
                if(data.status == 'ok'){
                    //清空定时器，清除本地文档
                    window.localStorage.removeItem("new");
                    $location.path('/article/' + data.articleId);
                }
            });
        };
    });
;'use strict';

angular.module('dwikiApp')
    .controller('PeopleCtrl', function ($scope, $http, $routeParams) {

        $scope.currentPage = $routeParams.page || 1;
        $http.get('/api/people/' + $routeParams.empNo, {
            params: {
                page: $scope.currentPage
            }
        }).success(function (data) {
            $scope.articles = data.articles;
            $scope.pageCount = data.pages;
            $scope.user = data.user;
        });

    });;'use strict';

angular.module('dwikiApp')
    .controller('SearchCtrl', function($scope,$rootScope, $http, $routeParams) {
        $scope.keyword = $routeParams.keyword;
        $scope.currentPage = $routeParams.page || 1;
        $http.get('/api/search', {
            params: {
                page: $scope.currentPage,
                keyword: $scope.keyword
            }
        }).success(function(data) {
            $scope.articles = data.articles;
            $scope.pageCount = data.pages;
        });
    });
;'use strict';

angular.module('dwikiApp')
    .controller('SettingsCtrl', function ($scope, $timeout, $location, $http, User, Auth) {
        /*
        var socket = io('http://localhost:9000');
        socket.on('news', function(data){
            showNotification(data);
        });

        */

        $http.get('/api/category').success(function(data){
            $scope.categoryContent = JSON.stringify(data);
            console.log(data);

        });


        $scope.submit = function(){
            $http.put('/api/category', {category: $scope.categoryContent}).success(function(data){
                console.log(data);
            })
        };


        $scope.showPermission = function () {
            Notification.requestPermission(function(permission){

                // Whatever the user answers, we make sure we store the information
                if(!('permission' in Notification)) {
                    Notification.permission = permission;
                }

                if(permission === 'granted') {
                    var notification = new Notification('消息提醒', {
                        icon: 'images/logo.png',
                        body: '匡前阳发表了新文章《技术分享排期》，点击查看。'
                    });
                    notification.onclick = function(){
                        $scope.$apply(function(){
                            $location.path('/article/53d1f61fcfc3dd0000000044');
                        })
                    }
                }
            });
            return;
            socket.emit('my other event', {
                title: 'front',
                body: 'frontbody'
            });
        };

        /*
        $timeout(function(){
            socket.emit('my other event', {
                title: 'front',
                body: 'frontbody'
            });
        }, 5000);
        */


        function showNotification(data){

            if(Notification.permission === 'granted') {
                var notification = new Notification(data.title, {
                    icon: 'images/logo.png',
                    body: data.body
                });
                notification.onclick = function(){
                    $scope.$apply(function(){
                        $location.path('/article/53d1f61fcfc3dd0000000044');
                    })
                }
            }else if(Notification !== "denied"){

                Notification.requestPermission(function(permission){

                    // Whatever the user answers, we make sure we store the information
                    if(!('permission' in Notification)) {
                        Notification.permission = permission;
                    }

                    if(permission === 'granted') {
                        var notification = new Notification(data.title, {
                            icon: 'images/logo.png',
                            body: data.body
                        });
                    }
                });
            }

        }


        /*

        if (window.notifications) {
            console.log("Notifications are supported!");
        }
        else {
            console.log("Notifications are not supported for this Browser/OS version yet.");
        }

            */


        /*
        $scope.errors = {};

        $scope.changePassword = function (form) {
            $scope.submitted = true;

            if (form.$valid) {
                Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
                    .then(function () {
                        $scope.message = 'Password successfully changed.';
                    })
                    .catch(function () {
                        form.password.$setValidity('mongoose', false);
                        $scope.errors.other = 'Incorrect password';
                    });
            }
        };
        */
    });
;'use strict';

angular.module('dwikiApp')
    .controller('SettingsCtrl', function ($scope, $timeout, $location, $http, User, Auth) {

        $http.get('/api/category').success(function(data){
            $scope.categoryContent = JSON.stringify(data);
            console.log(data);

        });


        $scope.submit = function(){
            $http.put('/api/category', {category: $scope.categoryContent}).success(function(data){
                console.log(data);
            })
        };


        /*
        $scope.errors = {};

        $scope.changePassword = function (form) {
            $scope.submitted = true;

            if (form.$valid) {
                Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
                    .then(function () {
                        $scope.message = 'Password successfully changed.';
                    })
                    .catch(function () {
                        form.password.$setValidity('mongoose', false);
                        $scope.errors.other = 'Incorrect password';
                    });
            }
        };
        */
    });
;'use strict';

angular.module('dwikiApp')
    .controller('SignupCtrl', function ($scope, Auth, $location) {
        $scope.user = {};
        $scope.errors = {};

        $scope.register = function (form) {
            $scope.submitted = true;

            if (form.$valid) {
                Auth.createUser({
                    name: $scope.user.name,
                    email: $scope.user.email,
                    password: $scope.user.password
                })
                    .then(function () {
                        // Account created, redirect to home
                        $location.path('/');
                    })
                    .catch(function (err) {
                        err = err.data;
                        $scope.errors = {};

                        // Update validity of form fields that match the mongoose errors
                        angular.forEach(err.errors, function (error, field) {
                            form[field].$setValidity('mongoose', false);
                            $scope.errors[field] = error.message;
                        });
                    });
            }
        };
    });;'use strict';

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
;'use strict';

angular.module('dwikiApp')
    .filter('surfix', function($http, $rootScope) {
        return function(path) {
            var arr = path.split('/');
            return arr[arr.length -1];
        };

    });
;/**
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
;'use strict';

angular.module('dwikiApp')
    .directive('dropdown', function($document, $location) {
        return {
            restrict: 'EA',
            link: function postLink(scope, element, attrs) {
                var openElement = null,
                    closeMenu = angular.noop;

                scope.$watch('$location.path', function() {
                    closeMenu();
                });
                element.parent().bind('click', function(e) {
                    e.stopPropagation();
                    // closeMenu();
                });
                element.siblings('.cate-panel').find('.glyphicon-remove').bind('click', function(){
                    closeMenu();
                });
                element.bind('click', function(event) {

                    var elementWasOpen = (element === openElement);

                    event.preventDefault();
                    event.stopPropagation();

                    if ( !! openElement) {
                        closeMenu();
                    }

                    if (!elementWasOpen && !element.hasClass('disabled') && !element.prop('disabled')) {
                        element.parent().addClass('open');
                        openElement = element;
                        closeMenu = function(event) {
                            if (event) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                            $document.unbind('click', closeMenu);
                            element.parent().removeClass('open');
                            closeMenu = angular.noop;
                            openElement = null;
                        };
                        $document.bind('click', closeMenu);
                    }
                });
            }
        };
    });
;'use strict';

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
;/**
 * Created by LiuYang on 15-02-27.
 * DEV首页中的所有组件展示
 */
'use strict';
angular.module('dwikiApp').directive('homeList',function($window){
    return function(scope,ele,attrs) {
        var listener = function (e) {

            //导航固定
            var scrollTop = $(window).scrollTop();
            if(scrollTop >= pos.top) {
                !isFixed && nav.addClass('fixed').css('paddingLeft', pos.left);
                isFixed = true;
            } else {
                isFixed && nav.removeClass('fixed').css('paddingLeft', 0);
                isFixed = false;
            }
            //更新位置信息
            updateposArr();
            //对比当前位置与位置信息
            for(var i = posArr.length-1 ; i>=0 ; i--) {
                if(posArr[i] - scrollTop <= 60) {
                    !(lastIndex === i) && nav.find('a[href]').removeClass('current').eq(i).addClass('current');
                    lastIndex = i;
                    break;
                }
            }
        };
        var p = ele,
            nav = p.find('div[nav]'),
            content = p.find('div[content]'),
            pos = nav.offset(),
            isFixed = false,
            posArr = [],
            timer = null,
            isUpdate = true,
            lastIndex;

        var updateposArr = function(){
            isUpdate && nav.find('a[href]').each(function(i){
                posArr[i] = $($(this).attr('href')).offset().top;
            });
            clearTimeout(timer);
            isUpdate = false;
            timer = setTimeout(function(){
                isUpdate = true;
            },500);
        };

        nav.wrap('<div/>').parent().css({
            'width':nav.width(),
            'height':nav.height()
        });
        //指令调用时绑定事件
        nav.on('click',function(e){
            //如果不是点击在a链接标签上
            if(!e.target.matches('a[href^="#"]')) return ;
            //如果点击在a链接标签上
            e.preventDefault();
            var pos = $($(e.target).attr('href')).offset();
            $('html,body').animate({
                'scrollTop':pos.top-40
            },'slow');
        });
        $(window).on('scroll',listener);
        //在控制器作用域被销毁时，直接去清除事件绑定
        scope.$on('$destroy',function(e){
            $(window).off('scroll',listener);
        });
    }
});
;'use strict';

angular.module('dwikiApp')

  /**
   * Removes server error when user updates input
   */
  .directive('mongooseError', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        element.on('keydown', function() {
          return ngModel.$setValidity('mongoose', true);
        });
      }
    };
  });;'use strict';

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
