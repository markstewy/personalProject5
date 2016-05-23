angular.module("app").controller("signupCtrl", function($scope, close, mainService) {


$scope.close = close;

//local auth
$scope.register = function() {
  mainService.register($scope.newUser).then(function(response) {
    console.log(response.data);
  });
};



}); //end controller
