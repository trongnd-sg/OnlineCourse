angular.module('courseApp.services')
 
.service('TopicService', function($q, $http, config, ParamBuilder) {

  this.getById = function(topicId) {
    var deferred = $q.defer()
    $http({
      method: 'GET',
      url: config.API_URL + '/topics/' + topicId
    }).success(function(response) {
      deferred.resolve(response)
    }).error(function(data, status, headers, cfg) {
      deferred.reject(data)
    })
    return deferred.promise
  }

  this.add = function(topic) {
    var deferred = $q.defer()
    $http({
      method: 'POST',
      url: config.API_URL + '/topics',
      data: topic
    }).success(function(response) {
      deferred.resolve(response)
    }).error(function(data, status, headers, cfg) {
      deferred.reject(data)
    })
    return deferred.promise
  }

  this.list = function(paging) {
    var q = ParamBuilder.build(paging)
    var url = config.API_URL + '/topics'
    if (q) url += '?' + q
    var deferred = $q.defer()
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
})