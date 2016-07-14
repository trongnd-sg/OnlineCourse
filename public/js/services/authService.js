angular.module('courseApp.services')
 
.service('AuthService', function($q, $http, $window, config) {
  /*
   * loginInfo structure 
   * {
   *  method: 'local', // 'facebook', 'google'
   *  email: 'user@example.com', // in case local login
   *  password: 'password', // in case local login 
   *  token: 'access token' // in case facebook or google login
   * }
   */
  var login = function(loginInfo) {
    var deferred = $q.defer()
    $http({
      method: 'POST',
      url: config.API_URL + '/auth',
      data: loginInfo
    }).success(function(response) {
      $window.localStorage.setItem(config.LOCAL_TOKEN_KEY, response.token)
      deferred.resolve(response)
    }).error(function(data, status, headers, cfg) {
      deferred.reject(data)
    })
    return deferred.promise
  }

  var logout = function() {
    $window.localStorage.removeItem(config.LOCAL_TOKEN_KEY)
  }

  var isAuthenticated = function() {
    var token = $window.localStorage.getItem(config.LOCAL_TOKEN_KEY)
    console.log('Token:', token)
    return (token)// !== undefined && token !== null
  }
 
  return {
    login: login,
    logout: logout,
    isAuthenticated: isAuthenticated
  }
})