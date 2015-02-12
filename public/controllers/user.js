angular.module('ForChange')
  .controller('UserCtrl', function($scope, $alert, $location, $http, $rootScope, User, $routeParams) {
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
  // 	$scope.user = {
  // 		"firstname":"Warren",
  // 		"lastname":"Gonsalves",
  // 		"location":"Mumbai",
  // 		"joinDate":"21 Jan 2015",
  // 		"anon":true,
  // 		"type":"admin",
  // 		"complaints":[
  // 			{"title":"test"},
  // 			{"desc":"asd asd asd asd asd asd asd asd asd asd asd asd asd as "},
  // 			{"location":"Mumbai"},
  // 			{"cat":"Utilities"},
  // 			{"subCat":"Roads"},
  // 			{"date":"30 Jan 2015"}
  // 		]
		// };

		$scope.makeStaff = function () {
			console.log('hihihi');
			//call to make staff
		}

});
