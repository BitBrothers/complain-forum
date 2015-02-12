angular.module('ForChange')
  .factory('User', function($resource) {
    return $resource('/api/user/:uslug', null,
    {
        'update': { method:'PUT' }
    });
  });
