angular.module('complaintForum')
.controller('ComplaintCtrl',function($scope,Complaint){

	 $scope.addComplaint=function(){
	 	 Complaint.save(
	 	 	{ 
	 	 		title: $scope.title,
	 	 		description:$scope.description,
	 	 		category: $scope.category,
	 	 		subcategory:$scope.subcategory,
	 	 		location:$scope.location

	 	 	});

	 	    $alert({
            content: response.data.message,
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
	 }

	
});


 
