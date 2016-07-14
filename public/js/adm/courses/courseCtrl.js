angular.module('courseApp.controllers')

.controller('CourseCtrl', function($scope, $stateParams, config, CourseService) {
	$scope.courseId = $stateParams.courseId
	var initialize = function() {
		console.log('CourseCtrl is loaded.')
	}

	initialize()
})
