angular.module('complaintForum')
.controller('ViewCtrl', function($scope,$routeParams,Complaint){

	var init = function(){
		var slug = $routeParams.slug;
		console.log(slug);
	$scope.complaint = Complaint.query({slug:slug});
};
	init();
});