angular.module('ForChange', ['ngResource', 'ngMessages', 'ngRoute', 
                            'mgcrea.ngStrap', 'angularFileUpload', '720kb.socialshare'])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/new-complaint', {
        templateUrl: 'views/postComplaint.html',
        controller: 'PostComplaintCtrl'
        })  
      .when('/list',{
        templateUrl: 'views/complain-list.html',
        controller: 'ListCtrl'        

      })
      .when('/complaint-details', {
        templateUrl: 'views/complaintDetails.html',
        controller: 'ComplaintDetailsCtrl'

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