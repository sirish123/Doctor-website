const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Patient = require("../models/patientData");


const getPatientById = async (req, res, next) => {
  const patientId = req.params.pid;

  let patient;
  try {
    patient = await Patient.find({ number: patientId });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong could not find patient",
      500
    );
    return next(error);
  }

  if (!patient) {
    const error = new HttpError(
      "Could not find a patient for the provided id.",
      404
    );
    return next(error);
  }

  res.json({
    patient: patient.map((patient) => patient.toObject({ getters: true })),
  });
};

const createPatient = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { number, name, address, gender, dateofbirth } = req.body;

  const createdPatient = new Patient({
   
    number,
    name,
    address,
    gender,
    dateofbirth
  });

  try {
    await createdPatient.save();
  } catch (err) {
    const error = new HttpError(
      "Creating patient failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ Patient: createdPatient });
};

const deletePatient = async (req, res, next) => {
  const PatientId = req.params.pid;

  let patient;
  try {
    patient = await Patient.findById(PatientId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete Patient.",
      500
    );
    return next(error);
  }

  if (!patient) {
    const error = new HttpError("Could not find Patient for this id.", 404);
    return next(error);
  }

  try {
    await patient.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete Patient.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted Patient." });
};
exports.deletePatient = deletePatient;
exports.getPatientById = getPatientById;
exports.createPatient = createPatient;
