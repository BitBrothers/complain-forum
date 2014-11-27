angular.module('complaintForum')
.factory('SignIn', function($resource){
    return $resource('/api/auth/login');
});
