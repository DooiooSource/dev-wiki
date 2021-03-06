angular.module('dwikiApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/404.html',
    "<!DOCTYPE html>\r" +
    "\n" +
    "<html lang=\"en\">\r" +
    "\n" +
    "  <head>\r" +
    "\n" +
    "    <meta charset=\"utf-8\">\r" +
    "\n" +
    "    <title>Page Not Found :(</title>\r" +
    "\n" +
    "    <style>\r" +
    "\n" +
    "      ::-moz-selection {\r" +
    "\n" +
    "        background: #b3d4fc;\r" +
    "\n" +
    "        text-shadow: none;\r" +
    "\n" +
    "      }\r" +
    "\n" +
    "\r" +
    "\n" +
    "      ::selection {\r" +
    "\n" +
    "        background: #b3d4fc;\r" +
    "\n" +
    "        text-shadow: none;\r" +
    "\n" +
    "      }\r" +
    "\n" +
    "\r" +
    "\n" +
    "      html {\r" +
    "\n" +
    "        padding: 30px 10px;\r" +
    "\n" +
    "        font-size: 20px;\r" +
    "\n" +
    "        line-height: 1.4;\r" +
    "\n" +
    "        color: #737373;\r" +
    "\n" +
    "        background: #f0f0f0;\r" +
    "\n" +
    "        -webkit-text-size-adjust: 100%;\r" +
    "\n" +
    "        -ms-text-size-adjust: 100%;\r" +
    "\n" +
    "      }\r" +
    "\n" +
    "\r" +
    "\n" +
    "      html,\r" +
    "\n" +
    "      input {\r" +
    "\n" +
    "        font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\r" +
    "\n" +
    "      }\r" +
    "\n" +
    "\r" +
    "\n" +
    "      body {\r" +
    "\n" +
    "        max-width: 500px;\r" +
    "\n" +
    "        _width: 500px;\r" +
    "\n" +
    "        padding: 30px 20px 50px;\r" +
    "\n" +
    "        border: 1px solid #b3b3b3;\r" +
    "\n" +
    "        border-radius: 4px;\r" +
    "\n" +
    "        margin: 0 auto;\r" +
    "\n" +
    "        box-shadow: 0 1px 10px #a7a7a7, inset 0 1px 0 #fff;\r" +
    "\n" +
    "        background: #fcfcfc;\r" +
    "\n" +
    "      }\r" +
    "\n" +
    "\r" +
    "\n" +
    "      h1 {\r" +
    "\n" +
    "        margin: 0 10px;\r" +
    "\n" +
    "        font-size: 50px;\r" +
    "\n" +
    "        text-align: center;\r" +
    "\n" +
    "      }\r" +
    "\n" +
    "\r" +
    "\n" +
    "      h1 span {\r" +
    "\n" +
    "        color: #bbb;\r" +
    "\n" +
    "      }\r" +
    "\n" +
    "\r" +
    "\n" +
    "      h3 {\r" +
    "\n" +
    "        margin: 1.5em 0 0.5em;\r" +
    "\n" +
    "      }\r" +
    "\n" +
    "\r" +
    "\n" +
    "      p {\r" +
    "\n" +
    "        margin: 1em 0;\r" +
    "\n" +
    "      }\r" +
    "\n" +
    "\r" +
    "\n" +
    "      ul {\r" +
    "\n" +
    "        padding: 0 0 0 40px;\r" +
    "\n" +
    "        margin: 1em 0;\r" +
    "\n" +
    "      }\r" +
    "\n" +
    "\r" +
    "\n" +
    "      .container {\r" +
    "\n" +
    "        max-width: 380px;\r" +
    "\n" +
    "        _width: 380px;\r" +
    "\n" +
    "        margin: 0 auto;\r" +
    "\n" +
    "      }\r" +
    "\n" +
    "\r" +
    "\n" +
    "      /* google search */\r" +
    "\n" +
    "\r" +
    "\n" +
    "      #goog-fixurl ul {\r" +
    "\n" +
    "        list-style: none;\r" +
    "\n" +
    "        padding: 0;\r" +
    "\n" +
    "        margin: 0;\r" +
    "\n" +
    "      }\r" +
    "\n" +
    "\r" +
    "\n" +
    "      #goog-fixurl form {\r" +
    "\n" +
    "        margin: 0;\r" +
    "\n" +
    "      }\r" +
    "\n" +
    "\r" +
    "\n" +
    "      #goog-wm-qt,\r" +
    "\n" +
    "      #goog-wm-sb {\r" +
    "\n" +
    "        border: 1px solid #bbb;\r" +
    "\n" +
    "        font-size: 16px;\r" +
    "\n" +
    "        line-height: normal;\r" +
    "\n" +
    "        vertical-align: top;\r" +
    "\n" +
    "        color: #444;\r" +
    "\n" +
    "        border-radius: 2px;\r" +
    "\n" +
    "      }\r" +
    "\n" +
    "\r" +
    "\n" +
    "      #goog-wm-qt {\r" +
    "\n" +
    "        width: 220px;\r" +
    "\n" +
    "        height: 20px;\r" +
    "\n" +
    "        padding: 5px;\r" +
    "\n" +
    "        margin: 5px 10px 0 0;\r" +
    "\n" +
    "        box-shadow: inset 0 1px 1px #ccc;\r" +
    "\n" +
    "      }\r" +
    "\n" +
    "\r" +
    "\n" +
    "      #goog-wm-sb {\r" +
    "\n" +
    "        display: inline-block;\r" +
    "\n" +
    "        height: 32px;\r" +
    "\n" +
    "        padding: 0 10px;\r" +
    "\n" +
    "        margin: 5px 0 0;\r" +
    "\n" +
    "        white-space: nowrap;\r" +
    "\n" +
    "        cursor: pointer;\r" +
    "\n" +
    "        background-color: #f5f5f5;\r" +
    "\n" +
    "        background-image: -webkit-linear-gradient(rgba(255,255,255,0), #f1f1f1);\r" +
    "\n" +
    "        background-image: -moz-linear-gradient(rgba(255,255,255,0), #f1f1f1);\r" +
    "\n" +
    "        background-image: -ms-linear-gradient(rgba(255,255,255,0), #f1f1f1);\r" +
    "\n" +
    "        background-image: -o-linear-gradient(rgba(255,255,255,0), #f1f1f1);\r" +
    "\n" +
    "        -webkit-appearance: none;\r" +
    "\n" +
    "        -moz-appearance: none;\r" +
    "\n" +
    "        appearance: none;\r" +
    "\n" +
    "        *overflow: visible;\r" +
    "\n" +
    "        *display: inline;\r" +
    "\n" +
    "        *zoom: 1;\r" +
    "\n" +
    "      }\r" +
    "\n" +
    "\r" +
    "\n" +
    "      #goog-wm-sb:hover,\r" +
    "\n" +
    "      #goog-wm-sb:focus {\r" +
    "\n" +
    "        border-color: #aaa;\r" +
    "\n" +
    "        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);\r" +
    "\n" +
    "        background-color: #f8f8f8;\r" +
    "\n" +
    "      }\r" +
    "\n" +
    "\r" +
    "\n" +
    "      #goog-wm-qt:hover,\r" +
    "\n" +
    "      #goog-wm-qt:focus {\r" +
    "\n" +
    "        border-color: #105cb6;\r" +
    "\n" +
    "        outline: 0;\r" +
    "\n" +
    "        color: #222;\r" +
    "\n" +
    "      }\r" +
    "\n" +
    "\r" +
    "\n" +
    "      input::-moz-focus-inner {\r" +
    "\n" +
    "        padding: 0;\r" +
    "\n" +
    "        border: 0;\r" +
    "\n" +
    "      }\r" +
    "\n" +
    "    </style>\r" +
    "\n" +
    "  </head>\r" +
    "\n" +
    "  <body>\r" +
    "\n" +
    "    <div class=\"container\">\r" +
    "\n" +
    "      <h1>Not found <span>:(</span></h1>\r" +
    "\n" +
    "      <p>Sorry, but the page you were trying to view does not exist.</p>\r" +
    "\n" +
    "      <p>It looks like this was the result of either:</p>\r" +
    "\n" +
    "      <ul>\r" +
    "\n" +
    "        <li>a mistyped address</li>\r" +
    "\n" +
    "        <li>an out-of-date link</li>\r" +
    "\n" +
    "      </ul>\r" +
    "\n" +
    "      <script>\r" +
    "\n" +
    "        var GOOG_FIXURL_LANG = (navigator.language || '').slice(0,2),GOOG_FIXURL_SITE = location.host;\r" +
    "\n" +
    "      </script>\r" +
    "\n" +
    "      <script src=\"//linkhelp.clients.google.com/tbproxy/lh/wm/fixurl.js\"></script>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </body>\r" +
    "\n" +
    "</html>\r" +
    "\n"
  );


  $templateCache.put('views/index.html',
    "<!doctype html>\r" +
    "\n" +
    "<!--[if lt IE 7]>      <html class=\"no-js lt-ie9 lt-ie8 lt-ie7\"> <![endif]-->\r" +
    "\n" +
    "<!--[if IE 7]>         <html class=\"no-js lt-ie9 lt-ie8\"> <![endif]-->\r" +
    "\n" +
    "<!--[if IE 8]>         <html class=\"no-js lt-ie9\"> <![endif]-->\r" +
    "\n" +
    "<!--[if gt IE 8]><!-->\r" +
    "\n" +
    "<html class=\"no-js\">\r" +
    "\n" +
    "<!--<![endif]-->\r" +
    "\n" +
    "\r" +
    "\n" +
    "<head>\r" +
    "\n" +
    "    <meta charset=\"utf-8\">\r" +
    "\n" +
    "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r" +
    "\n" +
    "    <base href=\"/\">\r" +
    "\n" +
    "    <title>DEV -- 德佑地产</title>\r" +
    "\n" +
    "    <meta name=\"description\" content=\"\">\r" +
    "\n" +
    "    <meta name=\"viewport\" content=\"width=device-width\">\r" +
    "\n" +
    "    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->\r" +
    "\n" +
    "    <!-- build:css(app) styles/vendor.css -->\r" +
    "\n" +
    "    <!-- bower:css -->\r" +
    "\n" +
    "    <!-- endbower -->\r" +
    "\n" +
    "    <!-- endbuild -->\r" +
    "\n" +
    "    <!-- build:css({.tmp,app}) styles/main.css -->\r" +
    "\n" +
    "    <link rel=\"stylesheet\" href=\"vendor/bootstrap/assets/stylesheets/bootstrap.css\"/>\r" +
    "\n" +
    "    <link rel=\"stylesheet\" href=\"vendor/simditor-1.0.5/styles/simditor.css\">\r" +
    "\n" +
    "    <link rel=\"stylesheet\" href=\"vendor/simditor-1.0.5/styles/font-awesome.css\">\r" +
    "\n" +
    "    <link rel=\"stylesheet\" href=\"dist/app.css\">\r" +
    "\n" +
    "    <link rel=\"stylesheet\" href=\"dist/tomorrow.css\">\r" +
    "\n" +
    "    <link rel=\"stylesheet\" href=\"vendor/default.min.css\">\r" +
    "\n" +
    "    <!-- endbuild -->\r" +
    "\n" +
    "</head>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<body ng-app=\"dwikiApp\">\r" +
    "\n" +
    "    <!--[if lt IE 7]>\r" +
    "\n" +
    "      <p class=\"browsehappy\">You are using an <strong>outdated</strong> browser. Please <a href=\"http://browsehappy.com/\">upgrade your browser</a> to improve your experience.</p>\r" +
    "\n" +
    "    <![endif]-->\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <!-- Add your site or application content here -->\r" +
    "\n" +
    "    <ng-view></ng-view>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <!--[if lt IE 9]>\r" +
    "\n" +
    "    <script src=\"bower_components/es5-shim/es5-shim.js\"></script>\r" +
    "\n" +
    "    <script src=\"bower_components/json3/lib/json3.min.js\"></script>\r" +
    "\n" +
    "    <![endif]-->\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <!-- build:js(app) scripts/vendor.js -->\r" +
    "\n" +
    "    <!-- bower:js -->\r" +
    "\n" +
    "    <script src=\"vendor/jquery/jquery.js\"></script>\r" +
    "\n" +
    "    <script src=\"bower_components/angular/angular.js\"></script>\r" +
    "\n" +
    "    <script src=\"bower_components/angular-resource/angular-resource.js\"></script>\r" +
    "\n" +
    "    <script src=\"bower_components/angular-cookies/angular-cookies.js\"></script>\r" +
    "\n" +
    "    <script src=\"bower_components/angular-sanitize/angular-sanitize.js\"></script>\r" +
    "\n" +
    "    <script src=\"bower_components/angular-route/angular-route.js\"></script>\r" +
    "\n" +
    "    <script src=\"bower_components/angular-bootstrap/ui-bootstrap.js\"></script>\r" +
    "\n" +
    "    <!-- endbower -->\r" +
    "\n" +
    "    <script src=\"vendor/simditor-1.0.5/scripts/js/simditor-all.js\"></script>\r" +
    "\n" +
    "    <script src=\"vendor/simditor-markdown.js\"></script>\r" +
    "\n" +
    "    <script src=\"vendor/highlight.min.js\"></script>\r" +
    "\n" +
    "    <script src=\"vendor/marked.js\"></script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <script src=\"vendor/toc.js\"></script>\r" +
    "\n" +
    "    <!--<script src=\"/socket.io/socket.io.js\"></script>-->\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <!-- endbuild -->\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <!-- build:js({.tmp,app}) scripts/scripts.js -->\r" +
    "\n" +
    "    <script src=\"scripts/app.js\"></script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <script src=\"scripts/controllers/main.js\"></script>\r" +
    "\n" +
    "    <script src=\"scripts/controllers/navbar.js\"></script>\r" +
    "\n" +
    "    <script src=\"scripts/controllers/login.js\"></script>\r" +
    "\n" +
    "    <script src=\"scripts/controllers/signup.js\"></script>\r" +
    "\n" +
    "    <script src=\"scripts/controllers/settings.js\"></script>\r" +
    "\n" +
    "    <script src=\"scripts/controllers/article.js\"></script>\r" +
    "\n" +
    "    <script src=\"scripts/controllers/people.js\"></script>\r" +
    "\n" +
    "    <script src=\"scripts/controllers/category.js\"></script>\r" +
    "\n" +
    "    <script src=\"scripts/controllers/new.js\"></script>\r" +
    "\n" +
    "    <script src=\"scripts/controllers/edit.js\"></script>\r" +
    "\n" +
    "    <script src=\"scripts/controllers/doc.js\"></script>\r" +
    "\n" +
    "    <script src=\"scripts/controllers/dui.js\"></script>\r" +
    "\n" +
    "    <script src=\"scripts/controllers/search.js\"></script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <script src=\"scripts/services/auth.js\"></script>\r" +
    "\n" +
    "    <script src=\"scripts/services/session.js\"></script>\r" +
    "\n" +
    "    <script src=\"scripts/services/user.js\"></script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <script src=\"scripts/directives/pagination.js\"></script>\r" +
    "\n" +
    "    <script src=\"scripts/directives/dropdown.js\"></script>\r" +
    "\n" +
    "    <script src=\"scripts/directives/demoshow.js\"></script>\r" +
    "\n" +
    "    <script src=\"scripts/directives/mongooseError.js\"></script>\r" +
    "\n" +
    "    <script src=\"scripts/directives/homeList.js\"></script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <script src=\"scripts/filters/catename.js\"></script>\r" +
    "\n" +
    "    <script src=\"scripts/filters/surfix.js\"></script>\r" +
    "\n" +
    "    <!-- endbuild -->\r" +
    "\n" +
    "</body>\r" +
    "\n" +
    "</html>\r" +
    "\n"
  );

}]);
