const express = require("express");
const router = express.Router();
const priceWatchController = require("../controllers/priceWatch");
const validateBody = require("../middleware/validateBody");
const validateObjectId = require("../middleware/validateObjectId");
const { createPriceWatchSchema } = require("../models/PriceWatch");

// These routes extend the /examples/ route

function logSomething() {
    console.log('something')
}

router.post(
    "/",
    validateBody(createPriceWatchSchema),
    priceWatchController.create
  );

module.exports = router;
