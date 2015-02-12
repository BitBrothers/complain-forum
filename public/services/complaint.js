angular.module('ForChange')
  .factory('Complaint', function($resource) {
    return $resource('/api/complaint/:cslug', null,
    {
        'update': { method:'PUT' }
    });
  });
