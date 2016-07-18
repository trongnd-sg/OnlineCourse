angular.module('courseApp.controllers')

.controller('AuthorsCtrl', function($scope, $state, config, AuthorService) {
	$scope.authors = []
	$scope.paging = {
		page: 1,
		size: 20,
		total: 0
	}
	var initialize = function() {
		console.log('AuthorsCtrl is loaded.')
		listAuthors()
	}

	var listAuthors = function() {
		AuthorService.list($scope.paging).then(function(response) {
			$scope.authors = response.authors
			$scope.paging.total = response.total
		}).catch(function(error) {
			alert('Error: ' + error.code + '<br>Message: ' + error.message)
		})
	}

	$scope.createAuthor = function() {
		$state.go('author')
	}

	initialize()
})
