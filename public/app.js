angular.module('complaintForum', ['ngResource', 'ngRoute', 'ngAnimate','uiGmapgoogle-maps','google.places'])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      
      .when('/home', {
        templateUrl:'views/home.html',
        controller:'HomeCtrl'
      })

      .when('/addcomplaint',{
        templateUrl:'views/addComplaint.html',
        controller:'ComplaintCtrl'
      })

      .otherwise({
        redirectTo: '/'
      });
  });


