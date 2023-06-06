const mongoose = require("mongoose");
const { Example } = require("../models/Example");
const { PriceWatch } = require("../models/PriceWatch")
const { Item } = require("../models/Item")
const httpError = require("../utilities/httpError");
require("express-async-errors");

const { updatePrices, updateAllPrices } = require('../scraper/scraper')
const { mailOne } = require('../nodeemailer/nodeemailer')


async function manageDailyTasks (req, res) {
  //get all data info
  await updateAllPrices();
  //check all pricewatches
  const priceWatches = await PriceWatch.find({}).populate('item')
  //send email if below price
  alertList = priceWatches.filter(pw => pw.desiredPrice >= pw.item.price.current)
  for (let i = 0; i < alertList.length; i++) {
    await mailOne(alertList[i])
  }
}

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

  // testing: async (req, res) => {
  //   await updateAllPrices()
  //   res.sendStatus(204)
  // },

  testing: async (req, res) => {
    await manageDailyTasks()
    res.sendStatus(204)
  },
};
