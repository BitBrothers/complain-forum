angular.module('ForChange')
  .factory('Complaint', function($resource, $window) {
    return $resource('/api/complaint/:cslug', null,
    {
        'update': { method:'PUT' }
    });
  });

angular.module('ForChange')
  .factory('Upvote', function($resource, $window) {
    return $resource('/api/complaint/:cslug/upvote', null,
    {
        'update': { method:'PUT' }
    });
  });

angular.module('ForChange')
  .factory('Follow', function($resource, $window) {
    return $resource('/api/complaint/:cslug/follow', null,
    {
        'update': { method:'PUT' }
    });
  });


