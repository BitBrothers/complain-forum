angular.module('ForChange')
  .controller('HomeCtrl', function($scope, $alert, $location, $http, $rootScope) {
	 console.log($rootScope.currentUser);
	  
  	$scope.gotoPostComplaint = function () {
  		console.log('ds');
  		$location.path('/new-complaint');

  	};
    
    $scope.exploreComplaint = function () {
  		$location.path('/list');
 	};

});
