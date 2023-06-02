const { Example } = require("../models/Example");
const { PriceWatch } = require("../models/PriceWatch")
const { Item } = require("../models/Item")
const httpError = require("../utilities/httpError");
require("express-async-errors");

const { updatePrices } = require('../scraper/scraper')

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

  getRecent: async (req, res) => {
    const event = await PriceWatch
      .find({})
      .sort({createdAt: -1})
      .populate('item')
      .limit(6)
    res.json(event)
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

  testing: async (req, res) => {
    await updatePrices('64762b28df347710e8542144')
  },
};
