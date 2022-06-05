const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  uniqueid: { type: String,   required: true },
  diagnosis: { type: String, required: true },
  paymentamount:{type:String, required:false},
  date:{type:String, required:false},
  time:{type:String, required:false}
});
module.exports = mongoose.model('bookings',bookingSchema);