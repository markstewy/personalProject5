angular.module("app").directive("landingDir", function() {

    return {
        // scope: {
        //    templHtmlName: '=passToDirName'
        // },
        templateUrl: './views/landing/landing.html',
        restrict: 'E', //link: function(scope, element, attr) {}, scope: {}   **also optoins,
      //   link: function(scope, element, attribute) {
      //       function getRandomInt(min, max) {
      //           return Math.floor(Math.random() * (max - min + 1)) + min;
      //       }
      //       var i = getRandomInt(0, 5);
      //       console.log(i);
      //       scope.imgMain = scope.imgBank[i];
      //       scope.quoteMain = scope.quoteBank[i];

            // elem.css('background', 'linear-gradient(rgba(171, 134, 2, 0.470588), rgba(193, 188, 177, 0.45098)),url(' + scope.imgMain + ') no-repeat center center fixed')
            // elem.css('background-size', 'cover')

      //   },
        controller: function($scope) {

           function getRandomInt(min, max) {
               return Math.floor(Math.random() * (max - min + 1)) + min;
           }
           var i = getRandomInt(0, 4);
            var classBank = [
               'wall',
               'sf',
               'girlwalking',
               'winter',
               'wallsmile',
               // 'vest',
               // 'tracks'
            ]
            var quoteBank = [
               "You don't have to go it alone.",//wall
               "No regrets.",//sf
               "Make deicsions with confidence.",//girlwalking
               "There's more to life than student loan payments.", //study
               "The future should make you smile." //wallsmile
            ]
            $scope.class= classBank[i];
            $scope.quote = quoteBank[i];
        }
    };

});
