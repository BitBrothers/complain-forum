angular.module('ForChange', ['ngResource', 'ngMessages', 'ngRoute', 'ngAnimate', 'ngAutocomplete', 'mgcrea.ngStrap', 'angularFileUpload', '720kb.socialshare', 'multi-select','truncate'])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    var isSubDomain = window.location.host.indexOf("goa") == 0
    var urlPath = isSubDomain ? "goa.forchange.io" : "forchange.io";

    $routeProvider
      .when('/', {
        templateUrl: 'views/' + urlPath + 'home.html',
        controller: 'HomeCtrl'
      })
      .when('/login', {
        resolve: {
          factory: checkLogin
        },
        templateUrl: 'views/' + urlPath + 'login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        resolve: {
          factory: checkLogin
        },
        templateUrl: 'views/' + urlPath + 'signup.html',
        controller: 'SignupCtrl'
      })
      .when('/new-complaint', {
        templateUrl: 'views/' + urlPath + 'postComplaint.html',
        controller: 'PostComplaintCtrl'
        })  
      .when('/complaints',{
        templateUrl: 'views/' + urlPath + 'complaintList.html',
        controller: 'ComplaintListCtrl'        
      })
      .when('/complaint-details/:cslug/editComplaint', {
        templateUrl: 'views/' + urlPath + 'editComplaint.html',
        controller: 'EditComplaintCtrl'
      })
      .when('/complaint-details/:cslug', {
        templateUrl: 'views/' + urlPath + 'complaintDetails.html',
        controller: 'ComplaintDetailsCtrl'
      })
      .when('/user/:uslug', {
        templateUrl: 'views/' + urlPath + 'userProfile.html',
        controller: 'UserCtrl'
      })
      .when('/faq', {
        templateUrl: 'views/' + urlPath + 'faq.html',
        controller: 'FaqCtrl'
      })
//      .when('/for-change', {
//        templateUrl: 'views/forChangeLanding.html',
//        controller: 'ForChangeLandingCtrl'
//      })
      .when('/unlock-city', {
        templateUrl: 'views/' + urlPath + 'unlockYourCity.html',
        controller: 'UnlockCityCtrl'
      })
      .when('/register-NGO', {
        templateUrl: 'views/' + urlPath + 'registerNGO.html',
        controller: 'RegisterNGOCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($rootScope, $q, $window, $location) {
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

var checkRouting= function ($q, $rootScope, $location, $alert) {
  if ($rootScope.currentUser) {
      return true;
  } else {
    $alert({
        content: 'You need to login to view that page.',
        placement: 'right',
        type: 'warning',
        duration: 5
      });
    $location.path("/login");
  }
  return null;
};

var checkLogin= function ($q, $rootScope, $location, $alert) {
  if ($rootScope.currentUser) {
    $location.path("/");
  }
  return null;
};