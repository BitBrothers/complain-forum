angular.module('ForChange')
  .controller('HomeCtrl', function($scope, $alert, $location, $http, $rootScope) {
	  console.log($rootScope.currentUser.profile.slug);
	  $scope.loggedIn = $rootScope.currentUser.profile.slug;
  	$scope.gotoPostComplaint = function () {
  		$location.path('/new-complaint');
  	}
});
