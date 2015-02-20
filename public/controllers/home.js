angular.module('ForChange')
  .controller('HomeCtrl', function($scope, $alert, $location, $http, $rootScope, Complaints) {
	 console.log($rootScope.currentUser);
	  
  	$scope.gotoPostComplaint = function () {
  		$location.path('/new-complaint');
  	};
    
    $scope.exploreComplaint = function () {
  		$location.path('/complaints');
 	};
    
    $scope.p = {};
    $scope.p.featured = true;
    $scope.complaints = Complaints.default.query($scope.p); 
    
    console.log($scope.complaints);
    

});
