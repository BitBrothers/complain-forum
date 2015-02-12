angular.module('ForChange')
  .factory('Complaint', function($resource, $window) {
    return $resource('/api/complaint/:cslug', null,
    {
        'update': { method:'PUT' }
    });
  });

angular.module('ForChange')
  .factory('Comment', function($resource, $window) {
    return $resource('/api/complaint/:cslug/comment', null,
    {
        'update': { method:'PUT' }
    });
  });
