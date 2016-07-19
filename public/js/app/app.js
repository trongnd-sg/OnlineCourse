angular.module('courseApp', ['courseApp.controllers', 'courseApp.services', 'courseApp.config', 'courseApp.utils', 'ui.router', 'ui.bootstrap', 'ngStorage'])

.config(function($httpProvider, $urlRouterProvider, $stateProvider, $locationProvider, $sessionStorageProvider, config) {
  console.log('Angular is configuring.')
  /**
   * Configure routing
   */
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'js/app/courses/home.html',
    controller: 'HomeCtrl'
  })
  .state('signin', {
    url: '/dang-nhap',
    templateUrl: 'js/app/users/signin.html',
    controller: 'SignInCtrl'
  })
  .state('search', {
    url: '/tim-kiem?text',
    templateUrl: 'js/app/courses/search.html',
    controller: 'SearchCtrl'
  })
  .state('course', {
    url: '/khoa-hoc/:courseId',
    templateUrl: 'js/app/courses/course.html',
    controller: 'CourseCtrl'
  })
  .state('author', {
    url: '/giang-vien/:authorId',
    templateUrl: 'js/app/users/author.html',
    controller: 'AuthorCtrl'
  })
  .state('subject', {
    url: '/linh-vuc/:subjectId',
    templateUrl: 'js/app/courses/subject.html',
    controller: 'SubjectCtrl'
  })
  .state('path', {
    url: '/con-duong-chuyen-gia',
    templateUrl: 'js/app/courses/path.html',
    controller: 'PathCtrl'
  })
  ;

  // Disable html5Mode
	$locationProvider.html5Mode(true);
	$locationProvider.hashPrefix('!');

  /**
   * configure HTTP Provider
   */
  $httpProvider.interceptors.push(function() {
    return {
      request: function(cfg) {
        if ($sessionStorageProvider.get(config.LOCAL_TOKEN_KEY))
          cfg.headers[config.HTTP_AUTH_HEADER] = $sessionStorageProvider.get(config.LOCAL_TOKEN_KEY)
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

.run(function($rootScope) {
	console.log('Angular is running.')
  $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
    $rootScope.hideSearchForm = toState.name === 'home'
  })
})