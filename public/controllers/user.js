angular.module('ForChange')
  .controller('UserCtrl', function($scope, $alert, $location, $http, $rootScope, User, $routeParams, Auth) {
  	User.default.get({
  		uslug : $routeParams.uslug
  	},
  	function (user) {
  		$scope.user = user;
      $scope.staff = false;
      if (user.role == 'staff') {
        $scope.staff = true;
      };
      
      console.log($scope.user);
  	},function(err){
      $location.path('/')
      $alert({
        content: 'No such User',
        placement: 'right',
        type: 'danger',
        duration: 5
      });
  	});

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
    };
    $scope.changePass = function () {
      Auth.changePassword({ oldPassword: $scope.password.old, newPassword: $scope.password.new });
    };

    $scope.makeStaff = function (newValue) {
      var oldValue = !newValue;
      console.log(newValue + " " + oldValue);
      User.makeStaff.update({
          uslug : $routeParams.uslug
        },{
          result : newValue
        },function(object) {
          $alert({
            content: object.message,
            placement: 'right',
            type: 'success',
            duration: 5
          });
          $scope.staff = newValue;
          console.log('success');
        }, function(object) {
          $alert({
            content: object.data,
            placement: 'right',
            type: 'danger',
            duration: 5
          });
          $scope.staff = oldValue;
        });
    };

  });
