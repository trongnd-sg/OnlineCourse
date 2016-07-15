angular.module('courseApp.services')
 
.service('SubjectService', function($q, $http, config) {

  this.getById = function(subjectId) {
    var deferred = $q.defer()
    $http({
      method: 'GET',
      url: config.API_URL + '/subjects/' + subjectId
    }).success(function(response) {
      deferred.resolve(response)
    }).error(function(data, status, headers, cfg) {
      deferred.reject(data)
    })
    return deferred.promise
  }

  this.add = function(subject) {
    var deferred = $q.defer()
    $http({
      method: 'POST',
      url: config.API_URL + '/subjects',
      data: subject
    }).success(function(response) {
      deferred.resolve(response)
    }).error(function(data, status, headers, cfg) {
      deferred.reject(data)
    })
    return deferred.promise
  }

  this.list = function() {
    var deferred = $q.defer()
    $http({
      method: 'GET',
      url: config.API_URL + '/subjects'
    }).success(function(response) {
      deferred.resolve(response)
    }).error(function(data, status, headers, cfg) {
      deferred.reject(data)
    })
    return deferred.promise
  }
})