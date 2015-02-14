angular.module('ForChange')
  .controller('EditComplaintCtrl', function($scope, $alert, $location, $http, $rootScope,Complaint, $routeParams) {
    
  $scope.cats = [{'value':'Cat1'}, {'value':'Cat2'}, {'value':'Cat3'}];
	  $scope.subCats = [{'value':'subCat1'}, {'value':'subCat2'}, {'value':'subCat3'}];

  Complaint.get({
        cslug : $routeParams.cslug
      },
      function(complaint) {
        $scope.complaint = complaint;
        console.log($scope.complaint);
        console.log($routeParams.cslug);
      });

    
  
    $scope.update = function() {
      Complaint.save({
        title: $scope.complaint.title,
        description: $scope.complaint.description,
        category: $scope.complaint.category.value,
        subcategory: $scope.complaint.subcategory.value ,
        location: $scope.complaint.location,
      },
      function(data){
        $alert({
          content: 'Your complaint was successfuly updated.',
          placement: 'right',
          type: 'success',
          duration: 5
        });
        $location.path('/complaint-details/'+$routeParams.slug);
      },
      function(data){
        $alert({
          content: 'There was an error please try again later.',
          placement: 'right',
          type: 'danger',
          duration: 5
        });
      });

    };

  
});

