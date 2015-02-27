angular.module('ForChange', ['ngResource', 'ngMessages', 'ngRoute', 'ngAnimate', 'ngAutocomplete', 'mgcrea.ngStrap', 'angularFileUpload', '720kb.socialshare', 'multi-select', 'truncate'])
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    var isSubDomain = window.location.host.indexOf("goa") == 0
    var urlPath = isSubDomain ? "goa.forchange.io" : "forchange.io";
    console.log(urlPath);

    $routeProvider
      .when('/', {
        templateUrl: 'views/' + urlPath + '/home.html'
      })
      .when('/login', {
        resolve: {
          factory: checkLogin,
          factory: checkRouting
        },
        templateUrl: 'views/' + urlPath + '/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        resolve: {
          factory: checkLogin,
          factory: checkRouting
        },
        templateUrl: 'views/' + urlPath + '/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/new-complaint', {
        templateUrl: 'views/' + urlPath + '/postComplaint.html',
        controller: 'PostComplaintCtrl'
      })
      .when('/complaints', {
        resolve: {
          factory: checkRouting
        },
        templateUrl: 'views/' + urlPath + '/complaintList.html',
        controller: 'ComplaintListCtrl'
      })
      .when('/complaint-details/:cslug/editComplaint', {
        resolve: {
          factory: checkRouting
        },
        templateUrl: 'views/' + urlPath + '/editComplaint.html',
        controller: 'EditComplaintCtrl'
      })
      .when('/complaint-details/:cslug', {
        resolve: {
          factory: checkRouting
        },
        templateUrl: 'views/' + urlPath + '/complaintDetails.html',
        controller: 'ComplaintDetailsCtrl'
      })
      .when('/user/:uslug', {
        resolve: {
          factory: checkRouting
        },
        templateUrl: 'views/' + urlPath + '/userProfile.html',
        controller: 'UserCtrl'
      })
      .when('/faq', {
        templateUrl: 'views/' + urlPath + '/faq.html',
        controller: 'FaqCtrl'
      })
      .when('/unlock-city', {
        templateUrl: 'views/' + urlPath + '/unlockYourCity.html',
        controller: 'UnlockCityCtrl'
      })
      .when('/register-NGO', {
        templateUrl: 'views/' + urlPath + '/registerNGO.html',
        controller: 'RegisterNGOCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push(function($rootScope, $q, $window, $location) {
      return {
        request: function(config) {
          if ($window.localStorage.token) {
            config.headers.Authorization = $window.localStorage.token;
          }
          return config;
        },
        responseError: function(response) {
          if (response.status === 401 || response.status === 403) {
            $location.path('/login');
          }
          return $q.reject(response);
        }
      }
    });
  });



var checkRouting = function($q, $rootScope, $location, $alert) {
  if (!window.location.host.indexOf("goa") == 0) {
    $location.path("/");
  }
  return null;
};

var checkLogin = function($q, $rootScope, $location, $alert) {
  if ($rootScope.currentUser) {
    $location.path("/");
  }
  return null;
};