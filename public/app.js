angular.module('MyApp', ['ngResource', 'ngRoute', 'ngAnimate'])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });