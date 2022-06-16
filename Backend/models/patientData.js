const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  number: { type: String,   required: true },
  name: { type: String, required: true },
  address:{type:String, required:true},
  gender :{type:String, required:true},
  dateofbirth:{type:String, required:true}
});
module.exports = mongoose.model('patients',patientSchema);