angular.module('courseApp.controllers')

.controller('MainCtrl', function($scope, config, AuthService) {

	$scope.isAuthenticated = false
	$scope.user = null

	var initialize = function() {
		console.log('authCtrl is loaded.')
		$scope.isAuthenticated =AuthService.isAuthenticated()
		$scope.user = AuthService.getUser()
	}

	initialize()
})
