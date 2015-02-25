angular.module('ForChange')
  .controller('ComplaintListCtrl', function($scope, $alert, $location, $http, $rootScope, Complaints) {
    
    $scope.complaints = Complaints.default.query();
    $scope.msClick = function() {
      $scope.p= {};
      if(!angular.isUndefined($scope.textQuery) && $scope.textQuery !== ""){ 
        $scope.p.keyword = $scope.textQuery; 
      };
      angular.forEach($scope.loc, function(value, key) {
        $scope.p.location = value.value;
      });
      angular.forEach($scope.cat, function(value, key) {
        $scope.p.category = value.value;
      });

      $scope.complaints = Complaints.default.query( $scope.p );
    };

    $scope.$watch('cat', function(newValue, oldValue) {
    	if (oldValue && newValue && !newValue.length)
    		$scope.msClick();
		});

    $scope.$watch('loc', function(newValue, oldValue) {
    	if (oldValue && newValue && !newValue.length)
    		$scope.msClick();
		});
    $scope.filterLocation = [
	    {
	        icon: '<i class="fa fa-map-marker"></i>',                         
	        name: '<strong>Location</strong>',
	        multiSelectGroup: true
	    },
	    { 
	        name: 'Goa',              
	        value: 'Goa',              
	        ticked: false
	    },
	    { 
	        name: 'Mumbai',  
	        value: 'Mumbai',  
	        ticked: false   
	    },
	    { 
	        name: 'Delhi',            
	        value: 'Delhi',            
	        ticked: false    
	    },
	    { 
	        name: 'Chennai',             
	        value: 'Chennai',             
	        ticked: false   
	    },
	    { 
	        name: 'Pune',             
	        value: 'Pune',             
	        ticked: false   
	    },
	    {
	        multiSelectGroup: false
	    }
	  ];
	  $scope.filterCat = [
	    {
	        icon: '<i class="fa fa-list-ul"></i>',                         
	        name: '<strong>Category</strong>',
	        multiSelectGroup: true
	    },
	    { 
	        name: 'cat1', 
	        value: 'Cat1', 
	        ticked: false    
	    },
	    { 
	        name: 'cat2',  
	        value: 'Cat2',  
	        ticked: false   
	    },
	    {
	        name: 'cat3',
	        value: 'Cat3',
	        ticked: false
	    },
	    {
	        multiSelectGroup: false
	    }
	];  
});
