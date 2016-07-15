angular.module('courseApp.controllers')

.controller('HomeCtrl', function($scope, config) {
	
	var initialize = function() {
		console.log('HomeCtrl is loaded.')
        jwplayer("videoDiv").setup({
          file: "https://content.jwplatform.com/videos/HkauGhRi-640.mp4",
          //file: "/upload/courses/5786111af5a2ff88245dae82.mp4",
          //width: "720",
          //height: "480",
          primary: "flash"
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
	}
	initialize()
})
