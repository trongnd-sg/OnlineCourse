angular.module('courseApp.controllers')

.controller('AuthorCtrl', function($scope, $stateParams, config, UserService) {

	$scope.author = null

	var initialize = function() {
		console.log('AuthorCtrl is loaded.')
	}

	$scope.getAuthor = function() {
		UserService.getById($stateParams.authorId).then(function(response) {
			$scope.author = response
		}).then(function(error) {
			console.log(error)
		})
	}

	initialize()
})
