angular.module('courseApp.controllers')

.controller('SubjectCtrl', function($scope, $state, $stateParams, config, SubjectService) {
	$scope.subject = null;

	var initialize = function() {
		console.log('SubjectCtrl is loaded.')
		if ($stateParams.subjectId)
			getSubject();
	}

	var getSubject = function() {
		SubjectService.getById($stateParams.subjectId).then(function(response) {
			$scope.subject = response;
		}).catch(function(error) {
			alert('Error: ' + error.code + '.<br>Message: ' + error.message)
		})
		return false;
	}

	$scope.addSubject = function() {
		if ($stateParams.subjectId) { // update

		} else { // add 
			SubjectService.add($scope.subject).then(function(response) {
				alert('Subject added successfully');
				$state.go('subjects');
			}).catch(function(error) {
				alert('Error: ' + error.code + '.<br>Message: ' + error.message)
			})
		}
	}


	initialize()
})
