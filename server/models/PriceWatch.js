const mongoose = require("mongoose");
const Joi = require("joi"); // data validation library

STRING_MAX_LENGTH = 100;

// Define the schema of the "event" object
const PriceWatchSchema = new mongoose.Schema(
  {
    sku: {
        type: Number,
        required: true,
    },
    desiredPrice: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }

  },
  // Enable timestamps for when each entry was created and last updated
  { timestamps: true }
);

// Saving our schema as a model
const PriceWatch = mongoose.model("PriceWatch", PriceWatchSchema);

// Schema for validating the recieved request.body when before an PriceWatch object is instantiated.
const createPriceWatchSchema = Joi.object({
  email: Joi.string().trim().min(1).max(100).required(),
  desiredPrice: Joi.number().min(1).max(999999999).required(),
  sku: Joi.number().min(1).max(100).required(),
});

// Export our schemas to be used in other files
module.exports = {
  PriceWatch,
  createPriceWatchSchema,
};