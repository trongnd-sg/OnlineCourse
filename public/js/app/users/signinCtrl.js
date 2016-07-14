angular.module('courseApp.controllers')

.controller('SignInCtrl', function($scope, $state, config, AuthService) {

	$scope.userInfo = {
		name: '',
		email: '',
		password: ''
	}

	var initialize = function() {
		console.log('SignInCtrl is loaded.')
	}

	$scope.localLogin = function() {
		AuthService.login({
			method: 'local',
			email: $scope.userInfo.email,
			password: $scope.userInfo.password
		}).then(function(response) {
			console.log(response)
			$state.go('home')
		}).catch(function(error) {
			console.log(error)
		})
	}

	$scope.facebookLogin = function() {
		FB.login(function(response) {
	  		if (response.authResponse) {
      			console.log('Facebook token:', response.authResponse)
				AuthService.login({
					method: 'facebook',
					token: response.authResponse.accessToken
				}).then(function(response) {
					console.log(response)
					$state.go('home')
				}).catch(function(error) {
					console.log(error)
				})
			} else {
      			console.log('User cancelled login or did not fully authorize.')
			}
		})
	}

	$scope.googleLogin = function() {
		var google_config = {
			'client_id': config.GOOGLE_CLIENT_ID,
			'scope': 'email profile'
		}
		gapi.auth.authorize(google_config, function() {
			var authResponse = gapi.auth.getToken()
			console.log('Google token:', authResponse)
			AuthService.login({
				method: 'google',
				token: authResponse.access_token
			}).then(function(response) {
				console.log(response)
				$state.go('home')
			}).catch(function(error) {
				console.log(error)
			})
		})
	}

	initialize()
})
