angular.module('ForChange')
  .controller('ComplaintDetailsCtrl', function($scope,$rootScope, Complaint) {
    
      Complaint.get({
          cslug: 'kachra'
        },
        function(complaint) {
          $scope.complaint = complaint;
          console.log($scope.complaint)
        });
  });