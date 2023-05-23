const mongoose = require("mongoose");
const { Example } = require("../models/Example");
const { PriceWatch } = require("../models/PriceWatch")
const { Item } = require("../models/Item")
const httpError = require("../utilities/httpError");
const { scrapeItemData } = require('../scraper/scraper')
require("express-async-errors");

module.exports = {
  create: async (req, res) => {

    // consume the example 
    const example = req.body;
    const sku = example.initialUrl.split('=')
    example.sku = Number(sku[sku.length - 1])
    example._id = new mongoose.Types.ObjectId()
    const result = await PriceWatch.create(example);
    // console.log(result)
    const targetID = result._id;
    const addedExamples = await PriceWatch.find({ _id: targetID })
      .lean()
      .exec();

    if (await Item.findOne({sku: example.sku})) {
      await Item.updateOne(
        {sku: example.sku},
        {$push: {priceWatches: example._id}}
      )
      console.log(`price watch added to existing item`)
    } else {
      const scrapeData = await scrapeItemData(example.initialUrl)
      scrapeData.priceWatches.push(example._id)
      scrapeData.priceData = []
      scrapeData.priceData.push({date: new Date, price: scrapeData.price.current})
      scrapeData.price.historicLow = scrapeData.price.current
      scrapeData.price.historicHigh = scrapeData.price.noSale
      await Item.create(scrapeData)
      console.log('price watch added and item scraped')
    }
    res.status(201).json({ message: "Price Watch created!", example: addedExamples });
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
