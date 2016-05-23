angular.module("app").service("calcSvc", function($http) {

    var service = this;

    //POPULATE SCHOOL DROPDOWN MENU ===========================
    this.getSchools = function() {
        return $http({
            method: 'GET',
            url: '/api/schools'
        }).then(function(res) {
            return res.data
        })
    };

    // BEG ROUGH ESTIMATE LOOKUP ==============================
    this.roughFnSvc = function(lookup) {
        var type = lookup.inout + lookup.housing
        return $http({
            method: 'GET',
            url: '/api/schools/' + type + '?_id=' + lookup.id
        }).then(function(response) {
            //   console.log(response.data[0]);
            if (response.data[0].inStateOnCampus) {
                response.data[0].cost = response.data[0].inStateOnCampus
            } else if (response.data[0].inStateOffCampus) {
                response.data[0].cost = response.data[0].inStateOffCampus
            } else if (response.data[0].outStateOnCampus) {
                response.data[0].cost = response.data[0].outStateOnCampus
            } else if (response.data[0].outStateOffCampus) {
                response.data[0].cost = response.data[0].outStateOffCampus
            }
            response.data[0].cost4 = response.data[0].cost * 4;
            return response.data[0];
        })
    };
    // END ROUGH ESTIMATE LOOKUP ==============================

    // BEG PAYMENT CALC ==============================
    this.pmtFn = function(ir, np, pv, fv, type) {
            //  NOTES
            //  ir - interest rate per month = 4.29%
            //  np - number of periods(months) = 120 months / 10 years
            //  pv - present value
            //  fv - future value
            //  type - when the payments are due:
            //  0: end of the period, e.g.end of month(default) * 1: beginning of period

            var pmt, pvif;

            fv || (fv = 0);
            type || (type = 0);

            if (ir === 0)
                return -(pv + fv) / np;

            pvif = Math.pow(1 + ir, np);
            pmt = -ir * pv * (pvif + fv) / (pvif - 1);

            if (type === 1)
                pmt /= (1 + ir);

            return pmt;

        }
        // ZIP CODE / CAREER API ==============================

    this.finSit = function() {
        return this.fakedata;

    };

   //  this.getzipdata = function() {
    //
    //
    //
    //
    //
    //
   //      return alldata
   //  }

    //===========================================================================================
    //TEMPORARY DEV DATA STORAGE=================================================================
    //===========================================================================================
    //
   //  var taxes = 665;
   //  var housing = 447;
   //  var food = 300;
   //  var transportation = 338;
   //  var medical = 175;
   //  var childcare = 1;
   //  var other = 190;
   //  var total = taxes + housing + food + transportation + medical + childcare + other;
    //
   //  this.costdata = [
   //      $scope.monthlyPmt, //student loans
   //      taxes, //taxes
   //      housing, //housing
   //      food, //food
   //      transportation, //transportation
   //      medical, //medical
   //      childcare, //child care
   //      other, //other
   //      (($scope.costliving.salary / 12) - total) //left over
   //  ];
    //
   //  this.labels = [
   //      "Student Loan Payment",
   //      "Tax Witholdings",
   //      "Housing",
   //      "Food",
   //      "Transportation",
   //      "Medical",
   //      "Child Care",
   //      "Other",
   //      "LEFT OVER!!"
   //  ];
    //

    this.fakedata = {
        name: "fakecostoflivingdata",
        title: "Computer Programming",
        zip: 84606,
        salary: 56000,
        hourly: 28,
        housing: 625,
        transportation: 300,
        food: 400,
        healthcare: 250,
        other: 300
    }


    this.occupations = [{
        "title": "Dog Trainer",
        "avgsalaryUS": 25000,
        84003: 13000,
        89005: 15000
    }, {
        "title": "Computer Programmer",
        "avgsalaryUS": 115000,
        84606: 56000,
        84003: 58000,
        84234: 59000,
        85432: 54000,
        84553: 53000,
        84754: 52000,
        84854: 51000,
        84883: 55000,
        87346: 59000,
        84040: 58000,
        84059: 57000,
        84820: 56000
    }, {
        "title": "Mechanic",
        "avgsalaryUS": 45000
    }, {
        "title": "Real Estate Agent",
        "avgsalaryUS": 50000
    }, {
        "title": "Opthamologist",
        "avgsalaryUS": 225000
    }]


    // this.schools = [
    //    {
    //       "name": "University of Nevada Las Vegas",
    //       "state": "Nevada",
    //       "percentage_of_undergranduates_with_student_loans": "78%",
    //       "median_total_debt_amt": 13000,
    //       "inStateOnCampus": 24231,
    //       "inStateOffCampus": 24231,
    //       "outStateOnCampus": 34231,
    //       "outStateOffCampus": 34231,
    //       "webCalc": "https://apps.ess.unlv.edu/fa_netpricecalc/npcalc.htm"
    //    },
    //    {
    //       "name": "Brigham Young Univeristy",
    //       "state": "Utah",
    //       "percentage_of_undergranduates_with_student_loans": "78%",
    //       "median_total_debt_amt": 13000,
    //       "inStateOnCampus": 10231,
    //       "inStateOffCampus": 10231,
    //       "outStateOnCampus": 10231,
    //       "outStateOffCampus": 10231,
    //       "webCalc": "https://financialaid.byu.edu/net-price-calculator"
    //    },
    //    {
    //       "name": "Brigham Young Univeristy - Idaho",
    //       "state": "Idaho",
    //       "percentage_of_undergranduates_with_student_loans": "78%",
    //       "median_total_debt_amt": 13000,
    //       "inStateOnCampus": 9123,
    //       "inStateOffCampus": 9231,
    //       "outStateOnCampus": 9321,
    //       "outStateOffCampus": 9132,
    //       "webCalc": "https://financialaid.byu.edu/net-price-calculator"
    //    },
    //    {
    //       "name": "Arizona State University",
    //       "state": "AZ",
    //       "percentage_of_undergranduates_with_student_loans": "78%",
    //       "median_total_debt_amt": 13000,
    //       "inStateOnCampus": 19123,
    //       "inStateOffCampus": 19231,
    //       "outStateOnCampus": 19321,
    //       "outStateOffCampus": 19132,
    //       "webCalc": "https://students.asu.edu/financialaid/net-price"
    //    },
    //    {
    //       "name": "Harvard University",
    //       "state": "MA",
    //       "percentage_of_undergranduates_with_student_loans": "78%",
    //       "median_total_debt_amt": 13000,
    //       "inStateOnCampus": 7123,
    //       "inStateOffCampus": 7231,
    //       "outStateOnCampus": 7321,
    //       "outStateOffCampus": 7132,
    //       "webCalc": "https://college.harvard.edu/financial-aid/net-price-calculator"
    //    },
    //    {
    //       "name": "Stanford Univeristy",
    //       "state": "CA",
    //       "percentage_of_undergranduates_with_student_loans": "78%",
    //       "median_total_debt_amt": 13000,
    //       "inStateOnCampus": 11123,
    //       "inStateOffCampus": 11231,
    //       "outStateOnCampus": 11321,
    //       "outStateOffCampus": 11132,
    //       "webCalc": "https://financialaid.stanford.edu/undergrad/how/calculator/"
    //    }
    // ]
    //
    // this.states = [
    //     {
    //         "name": "Alabama",
    //         "abbreviation": "AL"
    //     },
    //     {
    //         "name": "Alaska",
    //         "abbreviation": "AK"
    //     },
    //     {
    //         "name": "American Samoa",
    //         "abbreviation": "AS"
    //     },
    //     {
    //         "name": "Arizona",
    //         "abbreviation": "AZ"
    //     },
    //     {
    //         "name": "Arkansas",
    //         "abbreviation": "AR"
    //     },
    //     {
    //         "name": "California",
    //         "abbreviation": "CA"
    //     },
    //     {
    //         "name": "Colorado",
    //         "abbreviation": "CO"
    //     },
    //     {
    //         "name": "Connecticut",
    //         "abbreviation": "CT"
    //     },
    //     {
    //         "name": "Delaware",
    //         "abbreviation": "DE"
    //     },
    //     {
    //         "name": "District Of Columbia",
    //         "abbreviation": "DC"
    //     },
    //     {
    //         "name": "Federated States Of Micronesia",
    //         "abbreviation": "FM"
    //     },
    //     {
    //         "name": "Florida",
    //         "abbreviation": "FL"
    //     },
    //     {
    //         "name": "Georgia",
    //         "abbreviation": "GA"
    //     },
    //     {
    //         "name": "Guam",
    //         "abbreviation": "GU"
    //     },
    //     {
    //         "name": "Hawaii",
    //         "abbreviation": "HI"
    //     },
    //     {
    //         "name": "Idaho",
    //         "abbreviation": "ID"
    //     },
    //     {
    //         "name": "Illinois",
    //         "abbreviation": "IL"
    //     },
    //     {
    //         "name": "Indiana",
    //         "abbreviation": "IN"
    //     },
    //     {
    //         "name": "Iowa",
    //         "abbreviation": "IA"
    //     },
    //     {
    //         "name": "Kansas",
    //         "abbreviation": "KS"
    //     },
    //     {
    //         "name": "Kentucky",
    //         "abbreviation": "KY"
    //     },
    //     {
    //         "name": "Louisiana",
    //         "abbreviation": "LA"
    //     },
    //     {
    //         "name": "Maine",
    //         "abbreviation": "ME"
    //     },
    //     {
    //         "name": "Marshall Islands",
    //         "abbreviation": "MH"
    //     },
    //     {
    //         "name": "Maryland",
    //         "abbreviation": "MD"
    //     },
    //     {
    //         "name": "Massachusetts",
    //         "abbreviation": "MA"
    //     },
    //     {
    //         "name": "Michigan",
    //         "abbreviation": "MI"
    //     },
    //     {
    //         "name": "Minnesota",
    //         "abbreviation": "MN"
    //     },
    //     {
    //         "name": "Mississippi",
    //         "abbreviation": "MS"
    //     },
    //     {
    //         "name": "Missouri",
    //         "abbreviation": "MO"
    //     },
    //     {
    //         "name": "Montana",
    //         "abbreviation": "MT"
    //     },
    //     {
    //         "name": "Nebraska",
    //         "abbreviation": "NE"
    //     },
    //     {
    //         "name": "Nevada",
    //         "abbreviation": "NV"
    //     },
    //     {
    //         "name": "New Hampshire",
    //         "abbreviation": "NH"
    //     },
    //     {
    //         "name": "New Jersey",
    //         "abbreviation": "NJ"
    //     },
    //     {
    //         "name": "New Mexico",
    //         "abbreviation": "NM"
    //     },
    //     {
    //         "name": "New York",
    //         "abbreviation": "NY"
    //     },
    //     {
    //         "name": "North Carolina",
    //         "abbreviation": "NC"
    //     },
    //     {
    //         "name": "North Dakota",
    //         "abbreviation": "ND"
    //     },
    //     {
    //         "name": "Northern Mariana Islands",
    //         "abbreviation": "MP"
    //     },
    //     {
    //         "name": "Ohio",
    //         "abbreviation": "OH"
    //     },
    //     {
    //         "name": "Oklahoma",
    //         "abbreviation": "OK"
    //     },
    //     {
    //         "name": "Oregon",
    //         "abbreviation": "OR"
    //     },
    //     {
    //         "name": "Palau",
    //         "abbreviation": "PW"
    //     },
    //     {
    //         "name": "Pennsylvania",
    //         "abbreviation": "PA"
    //     },
    //     {
    //         "name": "Puerto Rico",
    //         "abbreviation": "PR"
    //     },
    //     {
    //         "name": "Rhode Island",
    //         "abbreviation": "RI"
    //     },
    //     {
    //         "name": "South Carolina",
    //         "abbreviation": "SC"
    //     },
    //     {
    //         "name": "South Dakota",
    //         "abbreviation": "SD"
    //     },
    //     {
    //         "name": "Tennessee",
    //         "abbreviation": "TN"
    //     },
    //     {
    //         "name": "Texas",
    //         "abbreviation": "TX"
    //     },
    //     {
    //         "name": "Utah",
    //         "abbreviation": "UT"
    //     },
    //     {
    //         "name": "Vermont",
    //         "abbreviation": "VT"
    //     },
    //     {
    //         "name": "Virgin Islands",
    //         "abbreviation": "VI"
    //     },
    //     {
    //         "name": "Virginia",
    //         "abbreviation": "VA"
    //     },
    //     {
    //         "name": "Washington",
    //         "abbreviation": "WA"
    //     },
    //     {
    //         "name": "West Virginia",
    //         "abbreviation": "WV"
    //     },
    //     {
    //         "name": "Wisconsin",
    //         "abbreviation": "WI"
    //     },
    //     {
    //         "name": "Wyoming",
    //         "abbreviation": "WY"
    //     }
    // ]
    //


});
