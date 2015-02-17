angular.module('ForChange')
 .factory('Complaints', function($resource) {
   var Complaints ={
     
     default :$resource('/api/complaints/:cslug', {cslug: '@cslug'},{
       update : {
         method:'PUT'
       }
     }),
       
     upvote : $resource('/api/complaints/:cslug', {cslug: '@cslug'},
       {
         update: 
         {
           method: 'PUT',
           params: {cslug: '@cslug'},
           url: '/api/complaints/:cslug/upvote'
         }
       }),
     comment : $resource('/api/complaints/:cslug', {cslug: '@cslug'},
       {
         save: 
         {
           method: 'POST',
           params: {cslug: '@cslug'},
           url: '/api/complaints/:cslug/comment'
         }
       }),
     follow : $resource('/api/complaints/:cslug', {cslug: '@cslug'},
       {
         update: 
         {
           method: 'PUT',
           params: {cslug: '@cslug'},
           url: '/api/complaints/:cslug/follow'
         }
       })
   };
   return Complaints;
 });