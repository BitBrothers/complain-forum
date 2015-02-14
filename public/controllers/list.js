angular.module('ForChange')
  .controller('ListCtrl', function($scope, $alert, $location, $http, $rootScope,Complaints) {
    
    $scope.complaints= Complaints.query();
    console.log($scope.complaints);
});
