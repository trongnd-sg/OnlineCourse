angular.module('courseApp.controllers')

.controller('SubjectsCtrl', function($scope, $state, config, SubjectService) {
	$scope.subjects = []
	$scope.paging = {
		page: 1,
		size: 20,
		total: 0
	}
	var initialize = function() {
		console.log('SubjectsCtrl is loaded.')
		listSubjects()
	}

	var listSubjects = function() {
		SubjectService.list($scope.paging).then(function(response) {
			$scope.subjects = response.subjects
			$scope.paging.totle = response.total
		})
	}

	$scope.createSubject = function() {
		$state.go('subject', { subjectId: '' })
	}

	$scope.deleteSubject = function(subjectId) {
	}

	initialize()
})
