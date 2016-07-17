angular.module('courseApp.controllers')

.controller('HomeCtrl', function($scope, $state, config, CourseService) {
	
  var slides = $scope.slides = [];
  var currIndex = 0;
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

    $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  
  

  for (var i = 0; i < 4; i++) {
    $scope.addSlide();
  }

  

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

  $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: 'http://placekitten.com/' + newWidth + '/300',
      text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
      id: currIndex++
    });
  };

  $scope.randomize = function() {
    var indexes = generateIndexesArray();
    assignNewIndexesToSlides(indexes);
  };

  // Randomize logic below

  function assignNewIndexesToSlides(indexes) {
    for (var i = 0, l = slides.length; i < l; i++) {
      slides[i].id = indexes.pop();
    }
  }

  function generateIndexesArray() {
    var indexes = [];
    for (var i = 0; i < currIndex; ++i) {
      indexes[i] = i;
    }
    return shuffle(indexes);
  }

  // http://stackoverflow.com/questions/962802#962890
  function shuffle(array) {
    var tmp, current, top = array.length;

    if (top) {
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
    }

    return array;
  }
  
  $scope.search = function(isFree, order) {
    var searchCtx = {
      text: $scope.txtSearch,
      isFree: isFree,
      page: $scope.paging.page,
      size: $scope.paging.size,
      order: order
    }
    CourseService.search(searchCtx).then(function(response) {
      $scope.courseList = response.courses
      $scope.paging.total = response.total
    }).catch(function(error) {
      alert('Error code: ' + error.code + '. Message: ' + error.message.vi)
    })
  }

  $scope.txtSearch = ''
  $scope.gotoSearchPage = function() {
    $state.go('search', { text: $scope.txtSearch })
    console.log('txtSearch', $scope.txtSearch)
  }

	initialize()
})
