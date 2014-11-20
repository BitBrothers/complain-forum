angular.module('complaintForum')
.factory('Home', function($resource){
    return $resource('/api/complaint/:complaint_id');
});