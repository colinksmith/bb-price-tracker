const { Example } = require("../models/Example");
const Item = require("../models/Item")
const { PriceWatch } = require("../models/PriceWatch")
const httpError = require("../utilities/httpError");
require("express-async-errors");

module.exports = {
  create: async (req, res) => {

    // consume the example 
    const example = req.body;
    console.log(example)
    const result = await PriceWatch.create(example);
    
    const targetID = result._id;
    const addedExamples = await PriceWatch.find({ _id: targetID })
      .lean()
      .exec();

    res.status(201).json({ message: "Example created!", example: addedExamples });
  },
  getAll: async (req, res) => {
    // Get an array of ALL example
    const example = await Example.find()
      .lean()
      .exec();

    // return all example
    res.json(example);
  },
  getOne: async (req, res) => {
    const { id } = req.params;

    // Get event by id
    const event = await Example.findById(id).lean().exec();

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
