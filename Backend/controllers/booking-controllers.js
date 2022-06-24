const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Booking = require("../models/bookingData");

const getBookingById = async (req, res, next) => {
  const bookingId = req.params.bid;

  let booking;
  try {
    booking = await Booking.findById(bookingId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong could not find Booking",
      500
    );
    return next(error);
  }

  if (!booking) {
    const error = new HttpError(
      "Could not find a Booking for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ booking: booking.toObject({ getters: true }) });
};
const getBookingByNumber = async (req, res, next) => {
  const numberid = req.params.did;
  let booking;
  try {

    booking = await Booking.find({ uniqueid: numberid }
    );
  } catch (err) {
    const error = new HttpError(
      "Something went wrong could not find Booking",
      500
    );
    return next(error);
  }

  if (!booking) {
    const error = new HttpError(
      "Could not find a Booking for the provided id.",
      404
    );
    return next(error);
  }

  res.json({
    booking: booking.map((booking) => booking.toObject({ getters: true })),
  });
};
const getBookingByRange = async (req, res, next) => {
  const date1 = req.params.did;
  const date2 = req.params.vid
  let booking;
  try {

    booking = await Booking.find({
      date:
      {
        $gte: date1,
        $lte:date2,
      }
    }
    );
  } catch (err) {
    const error = new HttpError(
      `Something went wrong could not find Booking`,
      500
    );
    return next(error);
  }

  if (!booking) {
    const error = new HttpError(
      "Could not find a Booking for the provided id.",
      404
    );
    return next(error);
  }

  res.json({
    booking: booking.map((booking) => booking.toObject({ getters: true })),
  });
};

const getBookingByDate = async (req, res, next) => {
  const dateId = req.params.did;

  let booking;
  try {
    booking = await Booking.find({ date: dateId });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong could not find Booking",
      500
    );
    return next(error);
  }

  if (!booking) {
    const error = new HttpError(
      "Could not find a Booking for the provided id.",
      404
    );
    return next(error);
  }

  res.json({
    booking: booking.map((booking) => booking.toObject({ getters: true })),
  });
};

const updateBooking = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const { diagnosis, paymentamount } = req.body;
  const bookingId = req.params.bid;

  let booking;
  try {
    booking = await Booking.findById(bookingId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find bookingid.',
      500
    );
    return next(error);
  }

  booking.diagnosis = diagnosis;
  booking.paymentamount = paymentamount;

  try {
    await booking.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update booking.',
      500
    );
    return next(error);
  }

  res.status(200).json({ booking: booking.toObject({ getters: true }) });
};

//Post request code to create a new object in the database
const createBooking = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { uniqueid, diagnosis, name, paymentamount, date, time } = req.body;

  const createdBooking = new Booking({
    uniqueid,
    name,
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
const deleteBooking = async (req, res, next) => {
  const BookingId = req.params.bid;

  let booking;
  try {
    booking = await Booking.findById(BookingId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete Booking.",
      500
    );
    return next(error);
  }

  if (!booking) {
    const error = new HttpError("Could not find Booking for this id.", 404);
    return next(error);
  }

  try {
    await booking.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete Booking.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted Booking." });
};
exports.getBookingByRange = getBookingByRange;
exports.deleteBooking = deleteBooking;
exports.getBookingByNumber = getBookingByNumber;
exports.getBookingByDate = getBookingByDate;
exports.updateBooking = updateBooking;
exports.getBookingById = getBookingById;
exports.createBooking = createBooking;
