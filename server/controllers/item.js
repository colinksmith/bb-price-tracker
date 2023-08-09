const mongoose = require("mongoose");
const { Example } = require("../models/Example");
const { PriceWatch } = require("../models/PriceWatch")
const { Item } = require("../models/Item")
const httpError = require("../utilities/httpError");
require("express-async-errors");

const { updatePrices, updateAllPrices, scrapeItemData } = require('../scraper/scraper')
const { mailOne } = require('../nodeemailer/nodeemailer')




module.exports = {

  manageDailyTasks: async (req, res) => {
    //get all data info
    await updateAllPrices();
    //check all pricewatches
    const priceWatches = await PriceWatch.find({'item': {$ne : null}}).populate('item')
    //send email if below price
    let alertList = priceWatches.filter(pw => pw.desiredPrice >= pw.item.price.current)
    for (let i = 0; i < alertList.length; i++) {
      await mailOne(alertList[i])
      await PriceWatch.findByIdAndDelete(alertList[i]._id);
    }
  },
  create: async (priceWatch) => {
    
    let item = await Item.findOne({sku: priceWatch.sku})
    if (item) {
      await Item.updateOne(
        {sku: priceWatch.sku},
        {$push: {priceWatches: priceWatch._id}}
      )
      await PriceWatch.updateOne(
        {_id: priceWatch._id},
        {item: item._id}
      )
      console.log(`price watch added to existing item`)
    } else {
      const scrapeData = await scrapeItemData(priceWatch.initialUrl)
      scrapeData.priceWatches.push(priceWatch._id)
      scrapeData.priceData = []
      scrapeData.priceData.push({date: new Date, price: scrapeData.price.current})
      scrapeData.price.historicLow = scrapeData.price.current
      scrapeData.price.historicHigh = scrapeData.price.noSale
      scrapeData._id = new mongoose.Types.ObjectId()
      item = await Item.create(scrapeData)
      await PriceWatch.updateOne(
        {_id: priceWatch._id},
        {item: item._id}
      )
      console.log('price watch added and item scraped')
    }
  },
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
      .find({item: { $ne: null}})
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

  // testing: async (req, res) => {
  //   await updateAllPrices()
  //   res.sendStatus(204)
  // },

  testing: async (req, res) => {
    console.log('testing')
  },
};
