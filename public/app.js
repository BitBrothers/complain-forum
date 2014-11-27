angular.module('complaintForum', ['ngResource', 'ngRoute', 'ngAnimate','uiGmapgoogle-maps','google.places'])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      
    .when('/', {
        templateUrl:'views/landing.html',
        controller:'LandingCtrl'
      })
    
        .when('/signup', {
        templateUrl:'views/signup.html',
        controller:'SignupCtrl'
      })

      .when('/addcomplaint',{
        templateUrl:'views/addComplaint.html',
        controller:'ComplaintCtrl'
      })

      .when('/search',{
        templateUrl:'views/searchfilters.html',
        controller:'SearchCtrl'
      })

      .when('/update',{
        templateUrl:'views/update.html',
        controller:'UpdateCtrl'
      })

      .otherwise({
        redirectTo: '/'
      });
  });


