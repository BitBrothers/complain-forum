angular.module('ForChange')
  .controller('ComplaintDetailsCtrl', function($scope, $rootScope, Complaints, $routeParams, $http, $alert, $location) {
    $scope.path = $location.path();
    $scope.upvoted = '';
    $scope.followed = '';

    $scope.currentStatusNew = false;
    $scope.currentStatusPending = false;
    $scope.currentStatusResolved = false;
    $scope.currentStatusUnresolved = false;
  
    $scope.sharingUrl = $location.absUrl();
  
    Complaints.default.get({
        cslug: $routeParams.cslug
      },
      function(complaint) {

        $scope.complaint = complaint;
        console.log($scope.complaint);
          console.log($rootScope.currentUser.profile.slug);
    console.log($scope.complaint.userId.profile.slug);

        if ($scope.complaint.upvote == true) {
          $scope.upvoted = 'upvoted';
        }


        if ($scope.complaint.follow == true) {
          $scope.followBoolean = false;
          $scope.followed = 'followed'
        } else if ($scope.complaint.follow == false) {
          $scope.followBoolean = true;
        }

//      Set value of current status
      
        if($scope.complaint.status == 'new'){
          $scope.currentStatusNew = true;
        } else if ($scope.complaint.status == 'pending') {
          $scope.currentStatusPending = true;
        } else if ($scope.complaint.status == 'resolved') {
          $scope.currentStatusResolved = true;
        } else if ($scope.complaint.status == 'unresolved') {
          $scope.currentStatusUnresolved = true;
        }

        $scope.currentStatusDropdown = [
          { name: "New", ticked: $scope.currentStatusNew},
          { name: "Pending", ticked: $scope.currentStatusPending},
          { name: "Resolved", ticked: $scope.currentStatusResolved},
          { name: "Unresolved", ticked: $scope.currentStatusUnresolved}
        ];

//      Ends      
      
      }, function(err){
          $location.path('/')
          $alert({
            content: 'No such Complaint',
            placement: 'right',
            type: 'danger',
            duration: 5
        });
      });


    $scope.updateCurrentStatus = function(data) {
      $scope.currentStatusDropdownValue = data.name;
      Complaints.status.update({
          cslug: $routeParams.cslug
        }, {
          status: $scope.currentStatusDropdownValue
        },
        function(data) {
          $alert({
            content: 'Status successfully updated to ' + $scope.currentStatusDropdownValue,
            placement: 'right',
            type: 'success',
            duration: 5
          });
          $scope.complaint.status = $scope.currentStatusDropdownValue
        },
        function(data) {
          $alert({
            content: 'There was an error please try again later.',
            placement: 'right',
            type: 'danger',
            duration: 5
          });
        });
    };

  
//   Comment Section JS Begins
  
      $scope.btn_add = function() {
        if ($scope.txtcomment != '') {
          pushChat($scope.txtcomment);
          $scope.txtcomment = "";
        };
      };

    var pushChat = function(abc) {
      Complaints.comment.save({
        cslug: $routeParams.cslug
      }, {
        description: abc
      }, function(object) {
        $alert({
          content: object.message,
          placement: 'right',
          type: 'success',
          duration: 5
        });
        $scope.complaint.comments.push({
          _id: {
            profile: {
              username: $rootScope.currentUser.profile.username
            }
          },
          description: abc,
          date: Date.now()
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
        cslug: $routeParams.cslug
      }, function(object) {
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

    if ($rootScope.currentUser) {
      $scope.isLoggedIn = 'true'
    } else {
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
               if ($scope.followBoolean == true)
              {
                $scope.followBoolean = false;
                $scope.followed = 'followed';
                $scope.complaint.followersCount++; 
              }
              else if ($scope.followBoolean == false)
              {
                $scope.followBoolean = true;
                $scope.followed = '';
                $scope.complaint.followersCount--;
              }
            
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
        else {
        $alert({
          content: "You need to be logged in to follow this complaint.",
          placement: 'right',
          type: 'danger',
          duration: 5
        });
      }

    };
    //    Follow Complaint JS Ends

    $scope.getLog = function () {
      Complaints.log.query({
        cslug: $routeParams.cslug
      }, function(log) {
        $scope.log = log;
        console.log($scope.log);
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

    $scope.reopenComplaint = function(data){
        Complaints.status.update({
          cslug : $routeParams.cslug
        },{
          status : null
        },
        function(data){
          $alert({
            content: data.message,
            placement: 'right',
            type: 'success',
            duration: 5
          });
          $scope.complaint.status = "unresolved";
          $('#reopenComplaintModal').modal('hide');
        },
        function(data){
          $alert({
            content: 'There was an error please try again later.',
            placement: 'right',
            type: 'danger',
            duration: 5
          });
        });

      }; 
      
    $scope.makeAnon = function (newValue) {
      var oldValue = !newValue;
      Complaints.makeAnon.update({
          cslug : $routeParams.cslug
        },{
          result : newValue
        },function(object) {
          $alert({
            content: object.message,
            placement: 'right',
            type: 'success',
            duration: 5
          });
          $scope.complaint.anon = newValue;
        }, function(object) {
          $alert({
            content: object.data,
            placement: 'right',
            type: 'danger',
            duration: 5
          });
          $scope.complaint.anon = oldValue;
          });
        };
  
  });