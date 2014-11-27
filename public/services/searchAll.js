angular.module('complaintForum')
.factory('searchAll', function($resource){
    return $resource('/api/complaints');
});
