angular.module('complaintForum')
.factory('searchLocation', function($resource){
    return $resource('api/complaint/searchloc/:location');
});
