angular.module('complaintForum')
.factory('searchStatus', function($resource){
    return $resource('api/complaint/searchstat/:status');
});
