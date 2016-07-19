angular.module('courseApp.controllers')

.controller('OrdersCtrl', function($scope, $state, config, SubjectService) {
	$scope.orders = []
	$scope.paging = {
		page: 1,
		size: 20,
		total: 0
	}
	var initialize = function() {
		console.log('OrdersCtrl is loaded.')
	}

	initialize()
})
