angular.module('ForChange')
  .controller('NavbarCtrl', function($scope,$rootScope, Auth) {
    $scope.logout = function() {
      Auth.logout();
    };
  
//    $scope.navbarTextColor = '';
//    $scope.changeTextColorGrey = function(){
//      $scope.navbarTextColor = 'blackText';
//    }
//    $scope.changeTextColorWhite = function(){
//      $scope.navbarTextColor = '';
//    }
  });