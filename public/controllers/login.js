angular.module('ForChange')
  .controller('LoginCtrl', function($scope, Auth) {
    $scope.login = function() {
      Auth.login({ email: $scope.email, password: $scope.password });
    };
    $scope.facebookLogin = function() {
      Auth.facebookLogin();
    };
    $scope.googleLogin = function() {
      Auth.googleLogin();
    };
    $scope.pageClass = 'fadeZoom';
  
//    $scope.navbarTextColor = 'blackText';
//    $scope.changeTextColorWhite = function(){
//      if($scope.navbarTextColor == 'blackText')
//      {
//        $scope.navbarTextColor = 'whiteText';
//      }
//    }  
  });