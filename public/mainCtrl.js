angular.module("app").controller("mainCtrl", function($scope, ModalService, mainService) {

// LOGIN MODAL
$scope.openlogin = function() {
   ModalService.showModal({
     templateUrl: "./views/login/login.html",
     controller: "loginCtrl"//,
   //   inputs: {
   //     'key': "Variable to be passed into controller"
   //   }
   }).then(function(modal) {
     // Function that runs when modal closes
     modal.close.then(function(then) {
       $scope.confirmationAnswer = then;
     });
   });
}

// SIGNUP MODAL
$scope.opensignup = function() {
   ModalService.showModal({
     templateUrl: "./views/signup/signup.html",
     controller: "signupCtrl"//,
   //   inputs: {
   //     'key': "Variable to be passed into controller"
   //   }
   }).then(function(modal) {
     // Function that runs when modal closes
     modal.close.then(function(then) {
       $scope.confirmationAnswer = then;
     });
   });
}


});//end of controller
