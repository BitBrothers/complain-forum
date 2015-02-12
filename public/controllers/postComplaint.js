angular.module('ForChange')
  .controller('PostComplaintCtrl', function($scope, $alert, $location, $http, $rootScope, Complaint) {

  	$scope.cats = [{value:'Cat1', value:'Cat2', value:'Cat3'}];
	  	$scope.subCats = [{value:'subCat1'}, {value:'subCat2'}, {value:'subCat3'}];
  	$scope.post = function() {
      Complaint.update({
        title: $scope.complaint.title,
        description: $scope.complaint.desc,
        category: $scope.complaint.cat,
        subcategory: $scope.complaint.subCat,
        location: $scope.complaint.location,
      }, function(err, data) {
        $alert({
          content: "Complaint was successfuly added.",
          placement: 'right',
          type: 'success',
          duration: 5
        });
      }, function(data) {
        $alert({
          content: "There was an error please try again later.",
          placement: 'right',
          type: 'danger',
          duration: 5
        });
      });
    };
});
