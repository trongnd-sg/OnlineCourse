angular.module('courseApp.controllers')

.controller('TopicCtrl', function($scope, $state, $stateParams, config, SubjectService, TopicService) {
	$scope.topic = null
	$scope.subjectList = []
	var initialize = function() {
		console.log('TopicsCtrl is loaded.')
		getTopic();
		listSubjects();
	}

	var getTopic = function() {
		TopicService.getById($stateParams.topicId).then(function(response) {
			$scope.topic = response
		}).catch(function(error) {
			alert();
		})
	}

	var listSubjects = function() {
		SubjectService.list().then(function(response) {
			$scope.subjectList = response.subjects
		})
	} 

	initialize()
})
