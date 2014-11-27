angular.module('complaintForum')
                .controller('LandingCtrl', function($scope,SignIn){
    $scope.signin=function()
    {   
        SignIn.save({
            
         username:$scope.username,
         password:$scope.password
        
        });
    };
});