angular.module('complaintForum')

.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
})

	
.controller('ComplaintCtrl',function($scope,Complaint,uiGmapGoogleMapApi,AddressGeocoder){

	 $scope.addComplaint=function(){
	 	 Complaint.save(
	 	 	{ 
	 	 		title: $scope.title,
	 	 		description:$scope.description,
	 	 		category: $scope.category,
	 	 		subcategory:$scope.subcategory,
	 	 		location:$scope.location.formatted_address

	 	 	});

	 	 
	 }










  $scope.autocompleteOptions = {
       componentRestrictions: { country: 'in' }
       }





$scope.$watch('location',
 function(newVal, oldVal){
   // console.log($scope.location);
   if(angular.isString($scope.location)){
   return;

   }

else{
	try{
	if(typeof($scope.location.formatted_address) !== undefined)
	
$scope.marker.coords.longitude=$scope.location.geometry.location.B;
$scope.marker.coords.latitude=$scope.location.geometry.location.k;
console.log($scope.location.geometry.location.B);
 	AddressGeocoder.getLocation($scope.location.formatted_address).then(function (result){

			if(result.success){
				$scope.map.center=result.location;
				

		
			}
		})

}
catch(e){}

   }
  });





	$scope.map = { 
		center: {
		 latitude: 45, longitude: -73 
		}, 
		zoom: 17
		 };

$scope.marker = {
      id: 0,
      coords: {
        latitude: 45,
        longitude: -73
      }
  };




uiGmapGoogleMapApi.then(function(maps) {

    });
	
});


 
