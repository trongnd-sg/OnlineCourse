angular.module('courseApp.services')
 
.service('AuthorService', function($q, $http, config, ParamBuilder) {

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

  this.list = function(searchCtx) {
    var deferred = $q.defer()
    var q = ParamBuilder.build(searchCtx)
    var url = config.API_URL + '/authors'
    if (q) url += '?' + q 
    $http({
      method: 'GET',
      url: url
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