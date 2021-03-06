angular.module('courseApp', ['courseApp.controllers', 'courseApp.services', 'courseApp.config', 'courseApp.utils', 'ui.router', 'ngStorage'])

.config(function($httpProvider, $urlRouterProvider, $stateProvider, $locationProvider, $sessionStorageProvider, config) {
  console.log('Angular is configuring.')
  /**
   * Configure routing
   */
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'js/adm/login/login.html',
    controller: 'LoginCtrl'
  })
  .state('home', {
    url: '/',
    templateUrl: 'js/adm/home/dashboard.html',
    controller: 'DashboardCtrl'
  })
  .state('subjects', {
    url: '/subjects',
    templateUrl: 'js/adm/subjects/subjects.html',
    controller: 'SubjectsCtrl'
  })
  .state('subject', {
    url: '/subjects/:subjectId',
    templateUrl: 'js/adm/subjects/subject.html',
    controller: 'SubjectCtrl'
  })
  .state('topics', {
    url: '/topics',
    templateUrl: 'js/adm/topics/topics.html',
    controller: 'TopicsCtrl'
  })
  .state('topic', {
    url: '/topics/:topicId',
    templateUrl: 'js/adm/topics/topic.html',
    controller: 'TopicCtrl'
  })
  .state('authors', {
    url: '/authors',
    templateUrl: 'js/adm/authors/authors.html',
    controller: 'AuthorsCtrl'
  })
  .state('author', {
    url: '/authors/:authorId',
    templateUrl: 'js/adm/authors/author.html',
    controller: 'AuthorCtrl'
  })
  .state('courses', {
    url: '/courses',
    templateUrl: 'js/adm/courses/courses.html',
    controller: 'CoursesCtrl'
  })
  .state('course', {
    url: '/courses/:courseId',
    templateUrl: 'js/adm/courses/course.html',
    controller: 'CourseCtrl'
  })
  .state('orders', {
    url: '/orders',
    templateUrl: 'js/adm/orders/orders.html',
    controller: 'OrdersCtrl'
  })
  .state('order', {
    url: '/orders/:orderId',
    templateUrl: 'js/adm/orders/order.html',
    controller: 'OrderCtrl'
  })
  .state('coupons', {
    url: '/coupons',
    templateUrl: 'js/adm/coupons/coupons.html',
    controller: 'CouponsCtrl'
  })
  .state('coupon', {
    url: '/coupons/:couponId',
    templateUrl: 'js/adm/coupons/coupon.html',
    controller: 'CouponCtrl'
  })
  ;
        
  // Disable html5Mode
	$locationProvider.html5Mode(false);
	//$locationProvider.hashPrefix('!');

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

.run(function($rootScope, $state, AuthService) {
	console.log('Angular is running.')
  $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
    if (toState.name !== 'login' && !AuthService.isAuthenticated()) {
      e.preventDefault();
      console.log(toState.name)
      return $state.go('login')
    }
  })
})