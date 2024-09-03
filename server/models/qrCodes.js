const mongoose = require("mongoose");

const qrSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  hostelNumber:{
    type: Number,
    required: true,
  },
  studentQr: [
    {
      date: String,
      qrCode1: {
        code: {
          type: String,
        },
        status: {
          type: Boolean,
          default: false,
        },
      },
      qrCode2: {
        code: {
          type: String,
        },
        status: {
          type: Boolean,
          default: false,
        },
      },
      qrCode3: {
        code: {
          type: String,
        },
        status: {
          type: Boolean,
          default: false,
        },
      },
      qrCode4: {
        code: {
          type: String,
        },
        status: {
          type: Boolean,
          default: false,
        },
      },
    },
  ],
});

module.exports = mongoose.model("QrSchema", qrSchema);
