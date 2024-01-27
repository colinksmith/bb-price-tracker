const mongoose = require("mongoose");
const Joi = require("joi"); // data validation library

STRING_MAX_LENGTH = 100;

// Define the schema of the "event" object
const PriceWatchSchema = new mongoose.Schema(
  {
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        default: null,
    },
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
    },
    initialUrl: {
        type: String,
        required: true,
    },
    isScraped: {
        type: Boolean,
        required: false,
        default: false,
    }

  },
  // Enable timestamps for when each entry was created and last updated
  { timestamps: true }
);

// Saving our schema as a model
const PriceWatch = mongoose.model("PriceWatch", PriceWatchSchema);

// Schema for validating the recieved request.body when before an PriceWatch object is instantiated.
const createPriceWatchSchema = Joi.object({
  email: Joi.string().trim().email({minDomainSegments: 2}).required(),
  desiredPrice: Joi.number().min(1).max(999999999).required(),
  initialUrl: Joi.string().trim().uri(),
  sku: Joi.number()
});

// Export our schemas to be used in other files
module.exports = {
  PriceWatch,
  createPriceWatchSchema,
};
