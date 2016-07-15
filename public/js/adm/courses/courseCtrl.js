angular.module('courseApp.controllers')

.controller('CourseCtrl', function($scope, $stateParams, config, CourseService) {
	$scope.course = {}

	var initialize = function() {
		console.log('CourseCtrl is loaded.')
		if ($stateParams.courseId)
			getCourse()
	}

	var getCourse = function() {
		CourseService.getById($stateParams.courseId).then(function(response) {
			$scope.course = response
		}).catch(function(error) {

		})
	}

	initialize()
})
