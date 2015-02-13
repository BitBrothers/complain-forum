angular.module('ForChange')
  .controller('ComplaintDetailsCtrl', function($scope,$rootScope, Complaint, Upvote, Follow, $routeParams, $http, $alert, $location) {
    
      Complaint.get({
          cslug : $routeParams.cslug
        },
        function(complaint) {
          $scope.complaint = complaint;
          console.log($scope.complaint);
          console.log($scope.complaint.userId.profile.slug);
        
          $scope.upvoted = '';
          if ($scope.complaint.upvote == true) 
          {
            $scope.upvoted = 'upvoted';
          }
        
          $scope.followBoolean = '';
          if ($scope.complaint.follow == true)
          {
            $scope.followBoolean = 'false';
          }
          else if ($scope.complaint.follow == false)
          {
            $scope.followBoolean = 'true';
          }
        });
  
        
 

     
//   Comment Section JS Begins
  
      $scope.btn_add = function() {
        if ($scope.txtcomment != '') {
          //        $scope.comment.push($scope.txtcomment);
          pushChat($scope.txtcomment);
          $scope.txtcomment = "";
          Complaint.get({
          cslug : $routeParams.cslug
          },
          function(complaint) {
            $scope.complaint = complaint;
          });
        };
      };
      var pushChat = function(abc) {
        $http({
          url: '/api/complaint/' + $routeParams.cslug + '/comment',
          method: 'PUT',
          data: {
            description: abc
          }
        }).success(function(data, status, headers, config) {


        }).
        error(function(data, status, headers, config) {


        });
      };
  
//    Comment Section JS Ends
  
//    Delete Complaint JS Begins  
      
      $scope.deleteComplaint = function() {
        Complaint.delete({
          cslug : $routeParams.cslug
        },function(object) {
          $alert({
            content: object.message,
            placement: 'right',
            type: 'success',
            duration: 5
          });
          $location.path('/');
        }, function(object) {
          $alert({
            content: object.data,
            placement: 'right',
            type: 'danger',
            duration: 5
          });
        });
      };
  
//    Delete Complaint JS Ends  
    
  
      $scope.upvote = function(){
        Upvote.update({
          cslug : $routeParams.cslug
        },{
          _id: null
        },function(object) {
          $alert({
            content: object.message,
            placement: 'right',
            type: 'success',
            duration: 5
          });
          Complaint.get({
          cslug : $routeParams.cslug
          },
          function(complaint) {
            $scope.complaint = complaint;
            
            $scope.upvoted = '';
          if ($scope.complaint.upvote == true) 
          {
            $scope.upvoted = 'upvoted';
          }
          });
        }, function(object) {
          $alert({
            content: object.data,
            placement: 'right',
            type: 'danger',
            duration: 5
          });
        });
      };
    
  
      $scope.follow = function(){
        Follow.update({
          cslug : $routeParams.cslug
        },{
          result : $scope.followBoolean
        },function(object) {
          $alert({
            content: object.message,
            placement: 'right',
            type: 'success',
            duration: 5
          });
          Complaint.get({
          cslug : $routeParams.cslug
          },
          function(complaint) {
            $scope.complaint = complaint;
          });
        }, function(object) {
          $alert({
            content: object.data,
            placement: 'right',
            type: 'danger',
            duration: 5
          });
        });
      };
    
      
  
  
  });