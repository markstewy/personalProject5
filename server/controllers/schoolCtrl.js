var School = require('../models/schoolModel.js');


module.exports = {
   Readschoolnames: function(req, res){
      School.find({}, function(err, response){
         res.json(response);
      })
   },
   Getroughestimate: function(req, res) {
      School.find(req.query).select(req.params.type + ' name state percentage_of_undergranduates_with_student_loans median_total_debt_amt webCalc')
      .exec(function(err, response) {
         if(err) {res.status(500).send(err)};
         res.status(200).send(response);
      })
   }




};//end exports
