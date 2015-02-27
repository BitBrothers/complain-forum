angular.module('ForChange')
  .controller('NavbarCtrl', function($scope,$rootScope, Auth,$location) {
    $scope.logout = function() {
      Auth.logout();
    };
    $scope.routeCheck = true;
    if($location.host() == "forchange.io"){
    	$scope.routeCheck = false;
    }
  });