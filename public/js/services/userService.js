angular.module('courseApp.services')
 
.service('UserService', function($q, $http, config) {

  this.getById = function(userId) {
    var deferred = $q.defer()
    $http({
      method: 'GET',
      url: config.API_URL + '/users/' + userId
    }).success(function(response) {
      deferred.resolve(response)
    }).error(function(data, status, headers, cfg) {
      deferred.reject(data)
    })
    return deferred.promise
  }

  this.update = function(user) {
    var deferred = $q.defer()
    $http({
      method: 'PUT',
      url: config.API_URL + '/users/' + user._id,
      data: user
    }).success(function(response) {
      deferred.resolve(response)
    }).error(function(data, status, headers, cfg) {
      deferred.reject(data)
    })
    return deferred.promise
  }

  this.add = function(user) {
    var deferred = $q.defer()
    $http({
      method: 'POST',
      url: config.API_URL + '/users',
      data: user
    }).success(function(response) {
      deferred.resolve(response)
    }).error(function(data, status, headers, cfg) {
      deferred.reject(data)
    })
    return deferred.promise
  }
})