angular.module('ForChange', ['ngResource', 'ngMessages', 'ngRoute', 'ngAnimate', 'ngAutocomplete', 
                            'mgcrea.ngStrap', 'angularFileUpload', '720kb.socialshare', 'multi-select','truncate'])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/login', {
        resolve: {
          factory: checkLogin
        },
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        resolve: {
          factory: checkLogin
        },
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/new-complaint', {
        templateUrl: 'views/postComplaint.html',
        controller: 'PostComplaintCtrl'
        })  
      .when('/complaints',{
        templateUrl: 'views/complaintList.html',
        controller: 'ComplaintListCtrl'        
      })
      .when('/complaint-details/:cslug/editComplaint', {
        templateUrl: 'views/editComplaint.html',
        controller: 'EditComplaintCtrl'
      })
      .when('/complaint-details/:cslug', {
        templateUrl: 'views/complaintDetails.html',
        controller: 'ComplaintDetailsCtrl'
      })
      .when('/user/:uslug', {
        templateUrl: 'views/userProfile.html',
        controller: 'UserCtrl'
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