angular.module('courseApp.controllers')

.controller('MainCtrl', function($scope, $state, config, events, AuthService) {

	$scope.isAuthenticated = AuthService.isAuthenticated()
	$scope.user = AuthService.getUser()

	var initialize = function() {
		$scope.$on(events.USER_SIGN_IN, function() {
			$scope.isAuthenticated = AuthService.isAuthenticated()
			$scope.user = AuthService.getUser()
		})

		$scope.$on(events.USER_SIGN_OUT, function() {
			$scope.isAuthenticated = false
			$scope.user = null
		})

		console.log('MainCtrl is loaded.')
	}

	$scope.signOut = function() {
		AuthService.logout()
		$state.go('login')
	}

	initialize()
})
