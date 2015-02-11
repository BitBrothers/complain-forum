angular.module('complaintForum')
.factory('Complaint', function($resource){
    return $resource('/api/complaint/:slug');
});
