const express = require("express");
const { check } = require("express-validator");
const priceControllers = require("../controllers/price-controllers");

const router = express.Router();

router.get("/getit", priceControllers.getPriceById);
router.get("/update/:sid", priceControllers.getPriceByMongoId);


router.post(
  "/",
  [
    check("price").not().isEmpty(),
  ],
  priceControllers.createTreatement
);

router.patch(
  '/:sid',
  [
    check("price").not().isEmpty(),
  ],
  priceControllers.updatePrice
);
router.delete('/:sid', priceControllers.deletePrice);


module.exports = router;
