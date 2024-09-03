const mongoose = require('mongoose') ;

const studentSchema = mongoose.Schema({
      email : {
            type: String,
            required: true,
      },
      password: {
            type: String,
            required: true,
      },
      name: {
            type: String,
            required: true,
      },
      roll: {
            type: String,
            required: true,
      },
      phone: {
            type: Number,
            required: true,
      },
      branch: {
            type: String,
            required: true,
      },
      hostelNumber:{
            type: Number,
            required: true,
      }
}) ;

module.exports = mongoose.model("StudentSchema", studentSchema) ;