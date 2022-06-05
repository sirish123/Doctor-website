const express = require("express");
const { check } = require("express-validator");
const bookingControllers = require("../controllers/booking-controllers");

const router = express.Router();



router.post(
  "/new",
  [
    check("paymentamount").not().isEmpty(),
    check("uniqueid").isLength({ min: 10 }),
    check("date").not().isEmpty(),
  ],
  bookingControllers.createBooking
);

module.exports = router;
