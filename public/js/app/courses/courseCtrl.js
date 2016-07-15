angular.module('courseApp.controllers')

.controller('CourseCtrl', function($scope, $stateParams, config, events, CourseService) {
	
	var initialize = function() {
		console.log('CourseCtrl is loaded.')
		console.log('Course ID/Title', $stateParams.courseId)
		getCourse()
	}

	var getCourse = function() {
		if ($stateParams.courseId) {
			CourseService.getById($stateParams.courseId).then(function(response) {
				$scope.course = response
			}).catch(function(error) {
				console.log(error)
			})
		}
	}
	initialize()
})
