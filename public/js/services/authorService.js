angular.module('courseApp.services')
 
.service('AuthorService', function($q, $http, config) {

  this.getById = function(authorId) {
    var deferred = $q.defer()
    $http({
      method: 'GET',
      url: config.API_URL + '/authors/' + authorId
    }).success(function(response) {
      deferred.resolve(response)
    }).error(function(data, status, headers, cfg) {
      deferred.reject(data)
    })
    return deferred.promise
  }

  this.update = function(author) {
    var deferred = $q.defer()
    $http({
      method: 'PUT',
      url: config.API_URL + '/authors/' + author._id,
      data: author
    }).success(function(response) {
      deferred.resolve(response)
    }).error(function(data, status, headers, cfg) {
      deferred.reject(data)
    })
    return deferred.promise
  }

  this.add = function(author) {
    var deferred = $q.defer()
    $http({
      method: 'POST',
      url: config.API_URL + '/authors',
      data: author
    }).success(function(response) {
      deferred.resolve(response)
    }).error(function(data, status, headers, cfg) {
      deferred.reject(data)
    })
    return deferred.promise
  }
})