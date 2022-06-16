const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const priceSchema = new Schema({
  searchId: { type: String, required: true },
  price: { type: Number, required: true },
  treatmentName: { type: String, required: true },
});
module.exports = mongoose.model("prices", priceSchema);
