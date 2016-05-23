angular.module("app").directive("costDir", function() {

    return {
        // scope: {
        //    templHtmlName: '=passToDirName'
        // },
        templateUrl: './views/calc/cost/cost.html',
        restrict: 'E', //link: function(scope, element, attr) {}, scope: {}   **also optoins,
         // link: function(scope, element, attribute) {},
        controller: 'calcCtrl'
    }; //end of return object
}); //end of directive
