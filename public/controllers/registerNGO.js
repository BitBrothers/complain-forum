angular.module('ForChange')
  .controller('RegisterNGOCtrl', function($scope, $alert, $location, $http, $rootScope, ContactUs) {
	 
   $scope.sendEmail = function() {
    ContactUs.default.save({
        name: $scope.contact.name,
        email: $scope.contact.email,
        phoneno: $scope.contact.phone,
        message: $scope.contact.message
      }, function(err, data) {
        $alert({
          content: "Email successfully sent!",
          placement: 'right',
          type: 'success',
          duration: 10
        });
        $scope.contact.name = '';
        $scope.contact.email = '';
        $scope.contact.phone = '';
        $scope.contact.message = '';
        $location.path('/for-change');
      }, function(data) {
        $alert({
          content: "There was an error please try again later.",
          placement: 'right',
          type: 'danger',
          duration: 5
        });
      });
   };

});
