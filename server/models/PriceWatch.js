const mongoose = require("mongoose");
const Joi = require("joi"); // data validation library

STRING_MAX_LENGTH = 100;

// Define the schema of the "event" object
const PriceWatchSchema = new mongoose.Schema(
  {
    productID: {
        type: mongoose.Schema.Types.ObjectId,
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
  stringField: Joi.string().trim().min(1).max(100).required(),
  numberField: Joi.number().min(1).max(100).required(),
  dateField: Joi.date()
    // Subtract one day because time on server may differ from client
    .min(new Date() - 60 * 60 * 24 * 1000)
    .required()
});

// Export our schemas to be used in other files
module.exports = {
  PriceWatch,
  createPriceWatchSchema,
};
