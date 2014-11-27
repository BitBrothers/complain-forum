angular.module('complaintForum')
.controller('SearchCtrl', function($scope,searchLocation,searchStatus,searchAll){

$scope.statusSearch=function(){
	console.log($scope.status);
	// $scope.p = {status:null};
	// $scope.p.status = $scope.status;
	$scope.complaints = searchStatus.query({status:$scope.status});
};

$scope.allSearch=function(){
	console.log($scope.status);

	$scope.complaints=searchAll.query();
};





 SW = new google.maps.LatLng(14.8945089, 73.6893279);
		 NE = new google.maps.LatLng(15.799917, 74.3405329);
 		 bounds11 = new google.maps.LatLngBounds(SW, NE);

  $scope.autocompleteOptions = {
       componentRestrictions: { country: 'in' },
        bounds:bounds11
         
       }

$scope.$watch('location',
 function(newVal, oldVal){
   if(angular.isString($scope.location)){
   return;
   }

else{
	try{
	if(typeof($scope.location.formatted_address) !== undefined)
		
    if($scope.location.formatted_address.indexOf("Goa") == -1){
console.log("error");
      return;
    }
	console.log($scope.location.formatted_address);
$scope.complaints = searchLocation.query({location:$scope.location.formatted_address});
 	

}
catch(e){}

   }
  });

});
