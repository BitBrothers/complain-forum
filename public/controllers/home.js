angular.module('ForChange')
  .controller('HomeCtrl', function($scope, $alert, $location, $http, $rootScope) {
	  console.log($rootScope.currentUser);
	  
  	$scope.gotoPostComplaint = function () {
  		$location.path('/new-complaint');
  	};
});
