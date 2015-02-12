angular.module('ForChange')
  .controller('ComplaintDetailsCtrl', function($scope,$rootScope, Complaint, $routeParams) {
    
      Complaint.get({
          cslug : $routeParams.cslug
        },
        function(complaint) {
          $scope.complaint = complaint;
          console.log($scope.complaint)
        });
  });