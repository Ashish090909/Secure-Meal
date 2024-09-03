const mongoose = require('mongoose') ;

const meal = {
      breakfast: {
            type: String,
      },
      lunch: {
            type: String, 
      },
      snacks: {
            type: String,
      },
      dinner: {
            type: String,
      },
} ;
const mealSchema = mongoose.Schema({
      email : {
            type: String,
            required: true,
      },
      hostelNumber :{
            type: Number,
      },
      routine: {
            type: Array,
      } 
      
}) ;

module.exports = mongoose.model("MealSchema", mealSchema) ;