$(document).ready(function() {
   //compass button
   $(document).on('mousemove', function(e) {
       var x = e.pageX;
       var y = e.pageY;
       var w = $(this).width();
      //  var h = $(this).height();
       var angle = Math.atan2(y-(450), x-(w/2)) * (180/Math.PI);
       var rotate = angle + (180-45);
       $('.button .compass')
           .css('-webkit-transform', 'rotate('+rotate+'deg)')
           .css('-moz-transform', 'rotate('+rotate+'deg)')
           .css('-ms-transform', 'rotate('+rotate+'deg)')
           .css('-o-transform', 'rotate('+rotate+'deg)')
           .css('transform', 'rotate('+rotate+'deg)');
   });

//FULL PAGE JS >> REMOVED FROM HTML FILE INLINE SCRIPT
$('#fullpage').fullpage({
   menu: '#menu',
   lockAnchors: false,
   anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage'],
   navigation: false,
   navigationPosition: 'right',
   navigationTooltips: ['firstSlide', 'secondSlide'],
   showActiveTooltip: false,
   slidesNavigation: true,
   slidesNavPosition: 'bottom',
   css3: true,
   scrollingSpeed: 1000,
   autoScrolling: true,
   fitToSection: true,
   fitToSectionDelay: 1000,
   scrollBar: false,
   easing: 'easeInOutCubic',
   easingcss3: 'ease',
   loopBottom: false,
   loopTop: false,
   loopHorizontal: true,
   continuousVertical: false,
   normalScrollElements: '#element1, .element2',
   scrollOverflow: false,
   touchSensitivity: 15,
   normalScrollElementTouchThreshold: 5
});


//
//
//     function getRandomInt(min, max) {
//         return Math.floor(Math.random() * (max - min + 1)) + min;
//     };
//     //  console.log(getRandomInt(0,5));
//     var i = getRandomInt(0, 5);
//     var imgMain = 'url(' + images[i] + ')';
//
//     $('#random-background').css({
//         // 'background-color': 'red'
//         'background-image': imgMain
//     });
//
//
});
