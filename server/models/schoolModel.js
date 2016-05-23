var mongoose = require('mongoose');

var Schools = new mongoose.Schema({

   name: {type: String, required: true},
   state: {type: String, required: true},
   percentage_of_undergranduates_with_student_loans: {type: String, required: true},
   median_total_debt_amt: {type: String, required: true},
   inStateOnCampus: {type: String, required: true},
   inStateOffCampus: {type: String, required: true},
   outStateOnCampus: {type: String, required: true},
   outStateOffCampus: {type: String, required: true},
   webCalc: {type: String, required: true}
//end of schema
})
module.exports = mongoose.model("Schools", Schools)
