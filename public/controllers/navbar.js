angular.module('ForChange')
  .controller('NavbarCtrl', function($scope,$rootScope, Auth,$location) {
    $scope.logout = function() {
      Auth.logout();
    };
    $scope.routeCheck = false;
    if($location.host() == "goa.forchange.io"){
    	$scope.routeCheck = true;
    }
  });
