angular.module('complaintForum')
.factory('SignUp', function($resource){
    return $resource('/api/auth/signup');
});
