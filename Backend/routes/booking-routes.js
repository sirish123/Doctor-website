const express = require("express");
const { check } = require("express-validator");
const bookingControllers = require("../controllers/booking-controllers");

const router = express.Router();

router.get("/:bid", bookingControllers.getBookingById);

router.get('/date/:did', bookingControllers.getBookingByDate);

router.get('/number/:did', bookingControllers.getBookingByNumber);

router.get('/revenue/:did/:vid', bookingControllers.getBookingByRange);

router.post(
  "/",
  [
    check("uniqueid").isLength({ min: 10 }),
    check("date").not().isEmpty(),
  ],
  bookingControllers.createBooking
);

router.patch(
  '/:bid',
  [
    check('paymentamount')
      .not()
      .isEmpty(),
    check('diagnosis').isLength({ min: 5 })
  ],
  bookingControllers.updateBooking
);

router.delete('/:bid', bookingControllers.deleteBooking);

module.exports = router;
