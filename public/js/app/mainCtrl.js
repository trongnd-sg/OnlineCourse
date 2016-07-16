angular.module('courseApp.controllers')

.controller('MainCtrl', function($scope, $state, config, events, AuthService) {

	$scope.isAuthenticated = AuthService.isAuthenticated()
	$scope.user = AuthService.getUser()
	$scope.txtSearch = ''
	$scope.isHome = true

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

	$scope.onSearch = function() {
		if (($state.name && $state.name === 'search') || ($state.current.name === 'search')) {
			$scope.$broadcast(events.SEARCH_TEXT_CHANGED)
			return false
		}
		$state.go('search')
		return false
	}

	initialize()
})
