const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
      meal : {
            type: String,
            required: true,
      },
      date : {
            type: String,
            required: true,
      },
      review : {
            type: String,
            required: true,
      },
      rating : {
            type: String,
            required: true,
      }
});

module.exports = mongoose.model("ReviewSchema", reviewSchema);
