angular.module('courseApp.controllers')

.controller('MainCtrl', function($scope, $state, config, events, AuthService) {

	$scope.isAuthenticated = false
	$scope.user = null

	var initialize = function() {
		$scope.$on(events.USER_SIGN_IN, function() {
			$scope.isAuthenticated = AuthService.isAuthenticated()
			$scope.user = AuthService.getUser()
		})

		console.log('authCtrl is loaded.')
	}

	$scope.search = function() {
		if ($state.name && $state.name == 'search') {
			$scope.broadcast(events.SEARCH_TEXT_CHANGED)
			return
		}
		$state.go('search')
	}

	initialize()
})
