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

	 };




$scope.map = { 
		center: {
		 latitude:  15.799917, longitude: 74.3405329 
		}, 
		zoom: 17
		 };

$scope.marker = {
      id: 0,
      coords: {
        latitude: 15.799917,
        longitude: 74.3405329
      }
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
		console.log($scope.autocompleteOptions.bounds);
    if($scope.location.formatted_address.indexOf("Goa") == -1){
console.log("error");
      return;
    }
	
$scope.marker.coords.longitude=$scope.location.geometry.location.B;
$scope.marker.coords.latitude=$scope.location.geometry.location.k;

 	AddressGeocoder.getLocation($scope.location.formatted_address).then(function (result){

			if(result.success){
				$scope.map.center=result.location;
				

		
			}
		})

}
catch(e){}

   }
  });

uiGmapGoogleMapApi.then(function(maps) {

    });




	
});


 
