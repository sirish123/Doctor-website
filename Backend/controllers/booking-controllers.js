//const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Booking = require("../models/bookingData");

const createBooking = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { uniqueid, diagnosis, paymentamount, date, time } = req.body;

  const createdBooking = new Booking({
    uniqueid,
    diagnosis,
    paymentamount,
    date,
    time,
  });

  try {
    await createdBooking.save();
  } catch (err) {
    const error = new HttpError(
      "Creating Booking failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ Booking: createdBooking });
};

exports.createBooking = createBooking;
