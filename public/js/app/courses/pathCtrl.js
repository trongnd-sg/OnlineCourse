angular.module('courseApp.controllers')

.controller('PathCtrl', function($scope, $stateParams, config, events, CourseService, SubjectService) {
	
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
		console.log('PathCtrl is loaded.')
	}

	
	initialize()
})
