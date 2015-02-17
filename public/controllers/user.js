angular.module('ForChange')
  .controller('UserCtrl', function($scope, $alert, $location, $http, $rootScope, User, $routeParams, Auth) {
  	User.get({
  		uslug : $routeParams.uslug
  	},
  	function (user) {
  		console.log(user);
  			$scope.user = user;
  	},function(err){
      $location.path('/')
      $alert({
        content: 'No such User',
        placement: 'right',
        type: 'danger',
        duration: 5
      });
  	});

    //promote a person to staff
		$scope.makeStaff = function () {
			console.log('hihihi');
			//call to make staff
		};


    //user is viewing his/her own page
    if ($rootScope.currentUser.profile.slug == $routeParams.uslug) 
      $scope.isCurrUser = true;
    else $scope.isCurrUser = false;
    

    //change password
    $scope.password = {};
    $scope.same = true;
    $scope.isSame = function () {
      if($scope.password.new == $scope.password.newConf)
       $scope.same = true;
      else $scope.same = false;
    }
    $scope.changePass = function () {
      Auth.changePassword({ oldPassword: $scope.password.old, newPassword: $scope.password.new });
    }
  });
