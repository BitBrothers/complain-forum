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

	 	/*    $alert({
            content: response.data.message,
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });*/

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
	console.log($scope.location.formatted_address);
 	AddressGeocoder.getLocation($scope.location.formatted_address).then(function (result){

			if(result.success){
				$scope.map.center=result.location;
				console.log(result.location);
				
				$scope.marker.coords=result.location;
					
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


 
