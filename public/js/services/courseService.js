angular.module('courseApp.services')
 
.service('CourseService', function($q, $http, config, ParamBuilder) {

  this.getById = function(courseId) {
    var deferred = $q.defer()
    $http({
      method: 'GET',
      url: config.API_URL + '/courses/' + courseId
    }).success(function(response) {
      deferred.resolve(response)
    }).error(function(data, status, headers, cfg) {
      deferred.reject(data)
    })
    return deferred.promise
  }

  this.search = function(searchContext) {
    var q = ParamBuilder.build(searchContext)
    var deferred = $q.defer()
    $http({
      method: 'GET',
      url: config.API_URL + '/courses?' + q
    }).success(function(response) {
      deferred.resolve(response)
    }).error(function(data, status, headers, cfg) {
      deferred.reject(data)
    })
    return deferred.promise
  }

  this.add = function(course) {
    var deferred = $q.defer()
    $http({
      method: 'POST',
      url: config.API_URL + '/courses',
      data: course
    }).success(function(response) {
      deferred.resolve(response)
    }).error(function(data, status, headers, cfg) {
      deferred.reject(data)
    })
    return deferred.promise
  }
})