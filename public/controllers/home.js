angular.module('ForChange')
  .controller('HomeCtrl', function($scope, $alert, $location, $http, $rootScope) {
  	$scope.gotoPostComplaint = function () {
  		console.log('ds');
  		$location.path('/new-complaint');
  	}  	
});
