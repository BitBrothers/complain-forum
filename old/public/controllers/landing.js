angular.module('complaintForum')
                .controller('LandingCtrl', function($scope, $modal, SignIn){
    $scope.signin=function()
    {   
    	console.log("Reached here");
        SignIn.save({
            
         username:$scope.username,
         password:$scope.password
        
        });
    };

    // $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'login.html',
      // controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return 0;
        }
      }
    });

  };
});