angular.module("app").controller("loginCtrl", function($scope, close) {

$scope.close = close;

//local Auth
$scope.login = function() {
   mainService.login($scope.credentials).then(function(response) {
     console.log(response.data);
   //   $state.go('profile'); //ng-show/hide for logout!!!!!!!!!!!!!
   });
 };

});
