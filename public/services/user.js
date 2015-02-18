angular.module('ForChange')
  .factory('User', function($resource) {
    var User = {
      default: $resource('/api/user/:uslug', {
        uslug: '@uslug'
      }, {
        update: {
          method: 'PUT',
          params: {
            uslug: '@uslug'
          }
        }
      }),
      makeStaff: $resource('/api/user/:uslug/promote', {
        uslug: '@uslug'
      }, {
        update: {
          method: 'PUT',
          params: {
            uslug: '@uslug'
          }
        }
      }),
      makeAnon: $resource('/api/user/:uslug/anonymous', {
        uslug: '@uslug'
      }, {
        update: {
          method: 'PUT',
          params: {
            uslug: '@uslug'
          }
        }
      })
    };
    return User;
  });