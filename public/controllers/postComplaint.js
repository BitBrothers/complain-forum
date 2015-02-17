angular.module('ForChange')
  .controller('PostComplaintCtrl', function($scope, $alert, $location, $http, $rootScope, Complaints) {
  	$scope.cats = [{'value':'Cat1'}, {'value':'Cat2'}, {'value':'Cat3'}];
	  $scope.subCats = [{'value':'subCat1'}, {'value':'subCat2'}, {'value':'subCat3'}];
  	$scope.post = function() {
  		console.log($scope.complaint.cat);
      Complaints.default.save({
        title: $scope.complaint.title,
        description: $scope.complaint.desc,
        category: $scope.complaint.cat.value,
        subcategory: $scope.complaint.subCat.value,
        location: $scope.complaint.location,
      }, function(err, data) {
        $alert({
          content: "Complaint was successfuly posted. It will be displayed after admin approval.",
          placement: 'right',
          type: 'success',
          duration: 10
        });
  			$location.path('/');
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
