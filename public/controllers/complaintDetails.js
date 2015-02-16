angular.module('ForChange')
  .controller('ComplaintDetailsCtrl', function($scope,$rootScope, Complaints, $routeParams, $http, $alert, $location) {
    $scope.path = $location.path();
    $scope.followBoolean = '';
    $scope.upvoted = '';
    $scope.followed = '';
  
      Complaints.default.get({
          cslug : $routeParams.cslug
        },
        function(complaint) {
          $scope.complaint = complaint;
          console.log($scope.complaint);
          console.log($scope.complaint.userId.profile.slug);
        
          
          if ($scope.complaint.upvote == true) 
          {
            $scope.upvoted = 'upvoted';
          }
        
          
          if ($scope.complaint.follow == true)
          {
            $scope.followBoolean = 'false';
            $scope.followed = 'followed'
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
//          Complaint.get({
//          cslug : $routeParams.cslug
//          },
//          function(complaint) {
//            $scope.complaint = complaint;
//          });
        };
      };
      var pushChat = function(abc) {
        Complaints.comment.save({
          cslug : $routeParams.cslug
        },{
            description: abc
        },function(object) {
            $alert({
              content: object.message,
              placement: 'right',
              type: 'success',
              duration: 5
            });
          $scope.complaint.comments.push({
            _id:{
              profile:{
                username : $rootScope.currentUser.profile.username
              }
            },
            description : abc,
            date : Date.now()
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
  
//    Comment Section JS Ends
  
//    Delete Complaint JS Begins  
      
      $scope.deleteComplaint = function() {
        Complaints.default.delete({
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
    
      $scope.isLoggedIn = '';
      
      if($rootScope.currentUser){
        $scope.isLoggedIn = 'true'
      }
      else{
        $scope.isLoggedIn = 'false'
      }
    
      console.log($scope.isLoggedIn);
      
//    Upvote Complaint JS Begins
  
      $scope.upvote = function(){
        if($rootScope.currentUser){
          Complaints.upvote.update({
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
            Complaints.default.get({
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
        }
      else{
        $alert({
              content: "You need to be logged in to upvote this complaint.",
              placement: 'right',
              type: 'danger',
              duration: 5
            });
        }
      };
//    Upvote Complaint JS Ends
  
  
//    Follow Complaint JS Begins

      $scope.follow = function(){
        if($rootScope.currentUser){
          Complaints.follow.update({
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
            Complaints.default.get({
            cslug : $routeParams.cslug
            },
            function(complaint) {
              $scope.complaint = complaint;
               if ($scope.complaint.follow == true)
              {
                $scope.followBoolean = 'false';
                $scope.followed = 'followed'
              }
              else if ($scope.complaint.follow == false)
              {
                $scope.followBoolean = 'true';
                $scope.followed = ''
              }
            });
          }, function(object) {
            $alert({
              content: object.data,
              placement: 'right',
              type: 'danger',
              duration: 5
            });
            console.log('error function entered');
          });
        }
        else{
          $alert({
              content: "You need to be logged in to follow this complaint.",
              placement: 'right',
              type: 'danger',
              duration: 5
            });
        }

      };
//    Follow Complaint JS Ends
      
  
  
  });