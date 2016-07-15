angular.module('courseApp.controllers')

.controller('SubjectCtrl', function($scope, $stateParams, config, events, CourseService, SubjectService) {
	
	$scope.paging = {
		page: 1,
		size: 20,
		total: 0
	}

	var searchContext = {
		page: $scope.paging.page,
		size: $scope.paging.size
	}

	var initialize = function() {
		console.log('SubjectCtrl is loaded.')
		console.log('subject ID/Title', $stateParams.subjectId)
		getSubject()
	}

	var getSubject = function() {
		if (!$stateParams.subjectId)
			return
		SubjectService.getById($stateParams.subjectId).then(function(response) {
			var subject = response
			searchContext.subjectId = subject._id
			listCourse(searchContext)
		}).catch(function(error) {
			console.log(error)
		})
	}

	var listCourse = function(searchContext) {
		CourseService.search(searchContext).then(function(response) {
			$scope.courseList = response.courses
			$scope.paging.total = response.total
		}).catch(function(error) {
			console.log(error)
		})
	}
	initialize()
})
