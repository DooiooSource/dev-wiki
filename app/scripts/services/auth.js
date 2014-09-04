'use strict';

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
    });