const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Price = require("../models/priceData");

const getPriceByMongoId = async (req, res, next) => {
  const PriceId = req.params.sid;

  let price;
  try {
    price = await Price.findById(PriceId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong could not find Price",
      500
    );
    return next(error);
  }

  if (!price) {
    const error = new HttpError(
      "Could not find a Price for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ price: price.toObject({ getters: true }) });
};

const getPriceById = async (req, res, next) => {
  const PriceId = "defaultId";

  let price;
  try {
    price = await Price.find({ searchId: PriceId });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong could not find Price",
      500
    );
    return next(error);
  }

  if (!price) {
    const error = new HttpError(
      "Could not find a Price for the provided id.",
      404
    );
    return next(error);
  }

  res.json({
    price: price.map((price) => price.toObject({ getters: true })),
  });
};
const createTreatement = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { searchId, treatmentName, price } = req.body;

  const createdTreatement = new Price({
    searchId,
    treatmentName,
    price,
  });

  try {
    await createdTreatement.save();
  } catch (err) {
    const error = new HttpError(
      "Creating Treatement failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ Price: createdTreatement });
};

const updatePrice = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { price, treatmentName } = req.body;
  const PriceId = req.params.sid;

  let prices;
  try {
    prices = await Price.findById(PriceId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find Priceid.",
      500
    );
    return next(error);
  }

  prices.price = price;
  prices.treatmentName = treatmentName;

  try {
    await prices.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update Price.",
      500
    );
    return next(error);
  }

  res.status(200).json({ prices: prices.toObject({ getters: true }) });
};
const deletePrice = async (req, res, next) => {
  const priceId = req.params.sid;

  let price;
  try {
    price = await Price.findById(priceId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete price.",
      500
    );
    return next(error);
  }

  if (!price) {
    const error = new HttpError("Could not find price for this id.", 404);
    return next(error);
  }

  try {
    await price.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete price.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted price." });
};
exports.deletePrice = deletePrice;
exports.getPriceByMongoId = getPriceByMongoId;
exports.updatePrice = updatePrice;
exports.getPriceById = getPriceById;
exports.createTreatement = createTreatement;
