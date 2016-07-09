angular.module('courseApp.services')
 
.factory('UserService', function($q, $http, config) {

  var getById = function(userId) {
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

  var update = function(user) {
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

  var add = function(user) {
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
 
  return {
    get: getById,
    update: update,
    add: add
  }
})