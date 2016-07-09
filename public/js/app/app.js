angular.module('courseApp', ['courseApp.controllers', 'courseApp.services', 'courseApp.config'])

.run(function() {
    console.log('Angular is running.')
})

.config(function($httpProvider, config) {
    console.log('Angular is configuring.')
    $httpProvider.interceptors.push(function($window, $q) {
    return {
      request: function(cfg) {
        if ($window.localStorage.getItem(config.LOCAL_TOKEN_KEY))
          cfg.headers[config.HTTP_AUTH_HEADER] = $window.localStorage.getItem(config.LOCAL_TOKEN_KEY)
        return cfg;
      },
      /*
      responseError: function (response) {
        $rootScope.$broadcast({
          401: AUTH_EVENTS.notAuthenticated,
          403: AUTH_EVENTS.notAuthorized
        }[response.status], response)
        return $q.reject(response)
      }
      */
    }
  })
})