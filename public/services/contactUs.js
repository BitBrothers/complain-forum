angular.module('ForChange')
  .factory('ContactUs', function($resource) {
    var ContactUs = {
        default: $resource('/api/contactus')
    };
    return ContactUs;
  });