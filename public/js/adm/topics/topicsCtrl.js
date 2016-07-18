angular.module('courseApp.controllers')

.controller('TopicsCtrl', function($scope, $state, config, TopicService) {
	$scope.topics = []
	$scope.paging = {
		page: 1,
		size: 20,
		total: 0
	}
	var initialize = function() {
		console.log('TopicsCtrl is loaded.')
		listTopics();
	}

	var listTopics = function() {
		TopicService.list($scope.paging).then(function(response) {
			$scope.topics = response.topics
			$scope.paging.total = response.total
			console.log('Topics: ', response)
		}).catch(function(error) {
			alert();
		})
	}

	$scope.createTopic = function() {
		$state.go('topic')
	}

	initialize()
})
