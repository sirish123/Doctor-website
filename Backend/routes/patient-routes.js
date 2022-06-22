const express = require("express");
const { check } = require("express-validator");
const patientControllers = require("../controllers/patient-controllers");

const router = express.Router();

router.get("/:pid", patientControllers.getPatientById);

router.post(
  "/",
  [
    check("name").not().isEmpty(),
    check("number").isLength({ min: 10 }),
    check("address").not().isEmpty(),
  ],
  patientControllers.createPatient
);
router.delete('/:pid', patientControllers.deletePatient);

module.exports = router;
