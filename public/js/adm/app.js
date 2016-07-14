angular.module('courseApp', ['courseApp.controllers', 'courseApp.services', 'courseApp.config', 'ui.router'])

.config(function($httpProvider, $urlRouterProvider, $stateProvider, $locationProvider, config) {
  console.log('Angular is configuring.')
  /**
   * Configure routing
   */
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'adm/home/dashboard.html',
    controller: 'DashboardCtrl'
  })
  .state('courses', {
    url: '/courses',
    templateUrl: 'adm/courses/courses.html',
    controller: 'CourseCtrl'
  })
  ;
        
  // Disable html5Mode
	$locationProvider.html5Mode(false);
	$locationProvider.hashPrefix('!');

  /**
   * configure HTTP Provider
   */
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
  }) // end of httpProvider config
})

.run(function() {
	console.log('Angular is running.')
})