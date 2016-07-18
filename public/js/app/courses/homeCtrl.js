angular.module('courseApp.controllers')

.controller('HomeCtrl', function($scope, $state, config, CourseService) {
  $scope.txtSearch = ''
  $scope.courseList = []
  $scope.paging = {
    page: 1,
    size: 8,
    total: 0
  }
  
  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  $scope.authors = [];
  $scope.slides = [];
  var currIndex = 0;

  var getAuthors = function() {
    for (var i = 0; i < 10; ++i) {
      var newWidth = 200 + currIndex;
      $scope.authors.push({
        avatar: 'http://placekitten.com/' + newWidth + '/204',
        name: 'name ' + currIndex,
        urlName: 'test-' + currIndex,
        career: 'Giảng viên DH ABC' + currIndex,
        id: currIndex++
      });
    }
  };

  var generateSlides = function(authors, groupSize) {
    var slides = []; // { id: 0, groups: [ author ]}
    var groupIndex = 0;
    var i = 0;
    while (i < authors.length) {
      if ((i % groupSize) == 0 ) { // new group
        slides.push({
          id: groupIndex,
          groups: []
        });
        groupIndex++;
      }
      slides[groupIndex - 1].groups.push(authors[i]);
      ++i;
    }
    return slides;
  }

  var initialize = function() {
	  console.log('HomeCtrl is loaded.')
    
    $scope.search(false, 2)

    $scope.noWrapSlides = false;
    $scope.active = 0;
    $scope.carouselInterval = 5000;
      
    getAuthors();
    $scope.slides = generateSlides($scope.authors, 4);
    
    initJWPlayer();
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

  $scope.gotoSearchPage = function() {
    $state.go('search', { text: $scope.txtSearch })
    console.log('txtSearch', $scope.txtSearch)
  }

  initJWPlayer = function() {
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
  }

	initialize()
})
