const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item");
const validateBody = require("../middleware/validateBody");
const validateObjectId = require("../middleware/validateObjectId");
const { createExampleSchema } = require("../models/Example");

// These routes extend the /item/ route
// router.post(
//   "/",
//   validateBody(createExampleSchema),
//   // maxExamples,
//   // This calls the examples controller
//   examplesController.create
// );

// router.get("/", examplesController.getAll);

router.get("/recent", itemController.getRecent)

router.get("/testing", itemController.manageDailyTasks)

router.get("/:id", validateObjectId, itemController.getOne);

// router.delete(
//   "/:id",
//   validateObjectId,
//   examplesController.deleteExample
// );

// router.delete(
//   "/deleteAllExamples/:groupId",
//   examplesController.deleteAllExamples
// );


module.exports = router;
