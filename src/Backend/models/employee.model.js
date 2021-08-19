const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    employeeId: { type: Number, required : true},
    PSID: { type: Number, required : true},
    employeeName: { type: String, required : true },
    startDate: { type: Date, required : true },
    endDate: { type: Date, required : true}
})

const employeeLeaveDetails = mongoose.model('employeeLeaveDetails',employeeSchema)

module.exports = employeeLeaveDetails;