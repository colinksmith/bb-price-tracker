const mongoose = require("mongoose");
const Joi = require("joi"); // data validation library

STRING_MAX_LENGTH = 100;

// Define the schema of the "event" object
const ItemSchema = new mongoose.Schema(
  {
    sku: {
        type: Number,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    pictureUrl: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    price: {
        current: { type: Number },
        noSale: { type: Number },
        historicLow: { type: Number },
        historicHigh: { type: Number },
    },
    priceData: Array,
    category: {
        type: String,
    },
    rating: {
        type: Number,
    },
    ratingCount: {
        type: Number,
    },
    priceWatches: {
        type: Array,
    }

  },
  // Enable timestamps for when each entry was created and last updated
  { timestamps: true }
);

// Saving our schema as a model
const Item = mongoose.model("Item", ItemSchema);

// Schema for validating the recieved request.body when before an Item object is instantiated.
const createItemSchema = Joi.object({
//   stringField: Joi.string().trim().min(1).max(100).required(),
//   numberField: Joi.number().min(1).max(100).required(),
//   dateField: Joi.date()
//     // Subtract one day because time on server may differ from client
//     .min(new Date() - 60 * 60 * 24 * 1000)
//     .required()
});

// Export our schemas to be used in other files
module.exports = {
  Item,
  createItemSchema,
};
