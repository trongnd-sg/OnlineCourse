angular.module('courseApp.services')
 
.service('AuthService', function($rootScope, $q, $http, $window, $sessionStorage, config, events) {
  /*
   * loginInfo structure 
   * {
   *  method: 'local', // 'facebook', 'google'
   *  email: 'user@example.com', // in case local login
   *  password: 'password', // in case local login 
   *  token: 'access token' // in case facebook or google login
   * }
   */
  this.login = function(loginInfo) {
    var deferred = $q.defer()
    $http({
      method: 'PUT',
      url: config.API_URL + '/auth',
      data: loginInfo
    }).success(function(response) {
      $sessionStorage[config.LOCAL_TOKEN_KEY] = response.token
      $sessionStorage[config.LOCAL_USER_KEY] = response.user
      $rootScope.$broadcast(events.USER_SIGN_IN)
      deferred.resolve(response)
    }).error(function(data, status, headers, cfg) {
      deferred.reject(data)
    })
    return deferred.promise
  }

  this.logout = function() {
    $sessionStorage[config.LOCAL_TOKEN_KEY] = null
    $sessionStorage[config.LOCAL_USER_KEY] = null
    $rootScope.$broadcast(events.USER_SIGN_OUT)
  }

  this.isAuthenticated = function() {
    var token = $sessionStorage[config.LOCAL_TOKEN_KEY]
    console.log('Token:', token)
    return (token)// !== undefined && token !== null
  }

  this.getUser = function() {
    var user = $sessionStorage[config.LOCAL_USER_KEY]
    console.log('User:', user)
    return user
  }

  this.register = function(userInfo) {
    var deferred = $q.defer()
    $http({
      method: 'POST',
      url: config.API_URL + '/auth',
      data: userInfo
    }).success(function(response) {
      deferred.resolve(response)
    }).error(function(data, status, headers, cfg) {
      deferred.reject(data)
    })
    return deferred.promise
  }
})