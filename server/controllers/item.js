const { Example } = require("../models/Example");
const { PriceWatch } = require("../models/PriceWatch")
const { Item } = require("../models/Item")
const httpError = require("../utilities/httpError");
require("express-async-errors");

module.exports = {
  getOne: async (req, res) => {
    const { id } = req.params;

    // Get event by id
    const event = await Item.findById(id).lean().exec();
    // Check if event exists
    if (!event) {
      throw httpError(404);
    }

    res.json(event);
  },
  deleteExample: async (req, res) => {
    const { id } = req.params;

    // Delete event by id
    await Example.findByIdAndDelete(id);

    res.sendStatus(204);
  },
  deleteAllExamples: async (req, res) => {
    await Example.remove({}).exec();

    res.sendStatus(204);
  },
};
