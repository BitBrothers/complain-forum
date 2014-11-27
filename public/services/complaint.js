angular.module('complaintForum')
.factory('Complaint', function($resource){
    return $resource('/api/complaint/:complaint_id');
});
