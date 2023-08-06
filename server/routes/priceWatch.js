const express = require("express");
const router = express.Router();
const priceWatchController = require("../controllers/priceWatch");
const validateBody = require("../middleware/validateBody");
const validateObjectId = require("../middleware/validateObjectId");
const { createPriceWatchSchema } = require("../models/PriceWatch");

// These routes extend the /examples/ route

function logSomething(data) {
    console.log('something')
    console.log(data.body)
    next()
}

router.post(
    "/",
    // validateBody(createPriceWatchSchema),
    priceWatchController.create
);

router.post(
  "/priceWatchData",
  priceWatchController.getItemsFromPriceWatch
)

router.delete(
  "/delete/:id",
  priceWatchController.deletePriceWatch
)

module.exports = router;
