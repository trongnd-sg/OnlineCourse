angular.module('courseApp.controllers')

.controller('authCtrl', function($scope, config, AuthService) {
	
	$scope.facebookLogin = function () {
		FB.login(function(response) {
	  		if (response.authResponse) {
      			console.log('Facebook token:', response.authResponse)
				AuthService.login({
					method: 'facebook',
					token: response.authResponse.accessToken
				}).then(function(response) {
					console.log(response)
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
			}).catch(function(error) {
				console.log(error)
			})
		})
	}

	var initialize = function() {
		console.log('authCtrl is loaded.')
	}

	initialize()
})
