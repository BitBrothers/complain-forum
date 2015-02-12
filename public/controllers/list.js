angular.module('ForChange')
  .controller('ListCtrl', function($scope, $alert, $location, $http, $rootScope,ComplaintList) {
    
    $scope.complaints= ComplaintList.query();
    console.log($scope.complaints);
});
