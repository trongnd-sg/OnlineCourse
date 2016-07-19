angular.module('courseApp.controllers')

.controller('LoginCtrl', function($scope, $state, AuthService) {
	$scope.userInfo = {
		email: '',
		password: '',
		method: 'local'
	}
	var initialize = function() {
		console.log('LoginCtrl is loaded.')
	}

	$scope.signIn = function() {
		AuthService.login($scope.userInfo).then(function(response) {
			var user = AuthService.getUser()
			if (user.role !== 'Admin') {
				AuthService.logout()
				toastr.error('You have no permission!', 'Login Error', { closeButton: true, timeOut: 5000, showMethod: 'fadeIn',
				hideMethod: 'fadeOut' })
				return
			}
			$state.go('home')
		}).catch(function(error) {
			toastr.error(error.message.en, 'Login Error', { closeButton: true, timeOut: 5000, showMethod: 'fadeIn',	hideMethod: 'fadeOut' })
		})
	}

	initialize()
})
