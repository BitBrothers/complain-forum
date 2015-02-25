angular.module('ForChange')
  .controller('FooterCtrl', function($scope, $rootScope, $location) {
    
    $scope.sharingUrl = $location.host();

    });