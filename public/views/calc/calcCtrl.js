angular.module("app").controller("calcCtrl", function($scope, calcSvc) {

    $scope.states = calcSvc.states; //basic data that is worth leaving on service
    $scope.occupations = calcSvc.occupations; //will switch to an API
    $scope.livingexp = calcSvc.livingexp; //will switch to an API


//POPLUATE SCHOOL NAMES IN SEARCH MENU =============================
    $scope.getSchools = function() {
      calcSvc.getSchools().then(function(response) {
         $scope.schools = response;
         console.log($scope.schools);
      });
   }
   $scope.getSchools();// invoked to automatically pull in school data for dropdown eveytime the page is loaded

//PULL ROUGH ESTIMATE AND IMPROVED ESTIMATES =============================
    $scope.roughFn = function(lookup) {
       calcSvc.roughFnSvc(lookup).then(function(response){
         //  console.log(response)
          $scope.cost = response;
          $scope.cost.estimateTag = "ROUGH";
       })
    }
    $scope.improvedFn = function(updatedAmt) {
        $scope.cost.cost = updatedAmt;
        $scope.cost.cost4 = updatedAmt * 4;
        $scope.cost.estimateTag = "IMPROVED";
    }

//TOTAL DEBT AND PMT FN =============================
    $scope.loanNeedFn = function(pay) {
        $scope.annLoans = $scope.cost.cost - pay.savings - pay.work - pay.family;
        $scope.totalLoans = $scope.annLoans * 4;
        var pay = -$scope.totalLoans;
        $scope.monthlyPmt = calcSvc.pmtFn(0.003575, 120, -$scope.totalLoans, 0);
    }

// CAREER AND ZIP LOOKUP INFO

    $scope.finSit = function(){
      $scope.costliving = calcSvc.finSit();
   };


// CHARTS JS DATA
// $scope.update = function() {
//    $scope.data = [$scope.monthlyPmt, 100, 100, 100, 100, 100, 100];
//    // [Math.random()*1000,Math.random()*1000,Math.random()*1000,Math.random()*1000,Math.random()*1000,Math.random()*1000,Math.random()*1000,Math.random()*1000];
// }
$scope.data = [100, 0, 0, 0, 0, 0, 0];

// $scope.getzipdata = function () {
//    $scope.zipdata = calcSvc.getzipdata();
// }
   $scope.labels = [
                     "Student Loan Payment",
                     "Tax Witholdings",
                     "Housing",
                     "Food",
                     "Transportation",
                     "Medical",
                     "Child Care",
                     "Other",
                     "LEFT OVER!!"
                  ];
   $scope.data = [100, 0, 0, 0, 0, 0, 0];
   $scope.getzipdata = function(){
      
      $scope.data = [
                     $scope.monthlyPmt, //student loans
                     taxes,  //taxes
                     housing,  //housing
                     food,   //food
                     transportation,   //transportation
                     medical,   //medical
                     childcare,   //child care
                     other,      //other
                     (($scope.costliving.salary/12)-total) //left over
                  ];
   }

});
 var taxes = 665;
 var housing = 447;
 var food = 300;
 var transportation = 338;
 var medical = 175;
 var childcare = 1;
 var other = 190;
 var total = taxes + housing + food + transportation + medical + childcare + other;
