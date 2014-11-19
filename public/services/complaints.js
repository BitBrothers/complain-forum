angular.module('MyApp')
.factory('Complaint', function($resource){
    return $resource('complaint/:complaint_id');
});