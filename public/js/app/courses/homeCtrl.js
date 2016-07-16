angular.module('courseApp.controllers')

.controller('HomeCtrl', function($scope, config, CourseSerivce) {
	
  var initialize = function() {
	  console.log('HomeCtrl is loaded.')
    
    jwplayer("videoDiv").setup({
      file: "https://content.jwplatform.com/videos/HkauGhRi-640.mp4",
      primary: "flash",
		  events: {
        onReady: function () { 
          this.play(); 
          this.pause(); 
        }
		  }
    })

		$(document).ready(function () {
        $('#myCarousel').carousel({
          interval: 5000
        })
        $('.fdi-Carousel .item').each(function () {
          var next = $(this).next();
          if (!next.length) {
            next = $(this).siblings(':first');
          }
          next.children(':first-child').clone().appendTo($(this));
      
          if (next.next().length > 0) {
            next.next().children(':first-child').clone().appendTo($(this));
          }
          else {
            $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
          }
        });
      });

      $scope.search(false, 2)
	}

  $scope.courseList = []
  $scope.paging = {
    page: 1,
    size: 8,
    total: 0
  }
  $scope.search = function(isFree, order) {
    var searchCtx = {
      isFree: isFree,
      page: $scope.paging.page,
      size: $scope.paging.size,
      order: order
    }
    CourseService.search(searchCtx).then(function(response) {
      $scope.courseList = reponse.course
      $scope.paging.total = response.total
    }).catch(function(error) {
      alert('Error code: ' + error.code + '. Message: ' + error.message.vi)
    })
  }

	initialize()
})
