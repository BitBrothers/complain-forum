angular.module('ForChange')

  .factory('Complaints', function($resource) {

    return $resource('/api/complaints');
  });