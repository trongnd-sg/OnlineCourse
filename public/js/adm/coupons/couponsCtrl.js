angular.module('courseApp.controllers')

.controller('CouponsCtrl', function($scope, $state, config, SubjectService) {
	$scope.coupons = []
	$scope.paging = {
		page: 1,
		size: 20,
		total: 0
	}
	var initialize = function() {
		console.log('CouponsCtrl is loaded.')
	}

	initialize()
})
