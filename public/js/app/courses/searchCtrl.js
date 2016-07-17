angular.module('courseApp.controllers')

.controller('SearchCtrl', function($scope, $location, config, events, CourseService) {
	
	var initialize = function() {
		console.log('SearchCtrl is loaded.')
		$scope.$on(events.SEARCH_TEXT_CHANGED, function() {
			$scope.search()
		})
		$scope.$parent.showSearchForm = true
		if ($location.search().text)
			$scope.$parent.txtSearch = $location.search().text
		$scope.search()
	}

	$scope.paging = {
		page: 1,
		size: 20,
		total: 0
	}

	$scope.courseList = []

	$scope.search = function() {
		var searchCtx = {
			text: $scope.$parent.txtSearch,
 			subject: '',
			topic: '',
 			free: false,
 			page: $scope.paging.page,
 			size: $scope.paging.size,
 			order: 1 // 1 - released date; 2 - popular;
		}
		CourseService.search(searchCtx).then(function(response) {
			$scope.courseList = response.courses
			$scope.paging.total = response.total
		}).catch(function(error) {

		})
	}

	initialize()
})
