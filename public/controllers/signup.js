angular.module('complaintForum')
                .controller('SignupCtrl', function($scope,SignUp){
    $scope.genders=[{type:'male'},{type:'female'}];
    $scope.gender=$scope.genders[0];

    $scope.signup=function()
    {   
        SignUp.save(
	 	 	{ 

                firstname: $scope.firstname,
                lastname: $scope.lastname,
                gender:$scope.gender.type,
                email:$scope.email,
                username: $scope.username,
	 	 		password:$scope.password,
                

	 	 	});
    };
});