const mongoose = require("mongoose");
const { Example } = require("../models/Example");
const { PriceWatch } = require("../models/PriceWatch")
const { Item } = require("../models/Item")
const httpError = require("../utilities/httpError");
const itemController = require ('./item')
require("express-async-errors");

module.exports = {
  create: async (req, res) => {

    const priceWatch = req.body;
    const sku = priceWatch.initialUrl.split('=')
    priceWatch.sku = Number(sku[sku.length - 1])
    priceWatch._id = new mongoose.Types.ObjectId()
    const result = await PriceWatch.create(priceWatch);
    // console.log(result)
    const targetID = result._id;
    const addedPriceWatch = await PriceWatch.find({ _id: targetID })
      .lean()
      .exec();
    res.status(201).json({ message: "Price Watch created!", priceWatch: addedPriceWatch });

    await itemController.create(priceWatch)
  },
  
  getItemsFromPriceWatch: async (req, res) => {
    const example = req.body;
    let priceWatches = await PriceWatch.find({email: req.body.email}).populate('item').exec()
    // let items = priceWatches.map(priceWatch => priceWatch.item)
    res.status(201).json({priceWatches})
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
  deletePriceWatch: async (req, res) => {
    const { id } = req.params;

    console.log('deleting the pricewatch ' + id)
    // Delete event by id
    await PriceWatch.findByIdAndDelete(id);

    res.sendStatus(204);
  },
  deleteAllExamples: async (req, res) => {
    await Example.remove({}).exec();

    res.sendStatus(204);
  },
};
