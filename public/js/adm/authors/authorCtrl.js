angular.module('courseApp.controllers')

.controller('AuthorCtrl', function($scope, $state, $stateParams, config, AuthorService) {
	$scope.author = null

	var initialize = function() {
		console.log('AuthorsCtrl is loaded.')
		if ($stateParams.authorId)
			getAuthor()
	}

	var getAuthor = function() {
		AuthorService.getById($stateParams.authorId).then(function(response) {
			$scope.author = response
		}).catch(function(error) {
			alert('Code: ' + error.code + '<br>Message: ' + error.message)
		})
	}

	$scope.addAuthor = function() {
		if ($stateParams.authorId) {

		} else {
			AuthorService.add($scope.author).then(function(response) {
				alert('Author added successfully.')
				$state.go('authors')
			}).catch(function(error) {
				alert('Code: ' + error.code);
			})
		}
	}

	$scope.cancel = function() {
		$state.go('authors')
	}

	initialize()
})
