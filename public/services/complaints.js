angular.module('ForChange')
  .factory('ComplaintList', function($resource) {
    return $resource('/api/complaints');
  });