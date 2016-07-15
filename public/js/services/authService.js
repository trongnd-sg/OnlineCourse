angular.module('courseApp.services')
 
.service('AuthService', function($rootScope, $q, $http, $window, config, events) {
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
      method: 'POST',
      url: config.API_URL + '/auth',
      data: loginInfo
    }).success(function(response) {
      $window.localStorage.setItem(config.LOCAL_TOKEN_KEY, response.token)
      $window.localStorage.setItem(config.LOCAL_USER_KEY, JSON.stringify(response.user))
      $rootScope.$broadcast(events.USER_SIGN_IN)
      deferred.resolve(response)
    }).error(function(data, status, headers, cfg) {
      deferred.reject(data)
    })
    return deferred.promise
  }

  this.logout = function() {
    $window.localStorage.removeItem(config.LOCAL_TOKEN_KEY)
    $window.localStorage.removeItem(config.LOCAL_USER_KEY)
    $rootScope.$broadcast(events.USER_SIGN_OUT)
  }

  this.isAuthenticated = function() {
    var token = $window.localStorage.getItem(config.LOCAL_TOKEN_KEY)
    console.log('Token:', token)
    return (token)// !== undefined && token !== null
  }

  this.getUser = function() {
    var user = JSON.parse($window.localStorage.getItem(config.LOCAL_USER_KEY))
    console.log('User:', user)
    return user
  }
})