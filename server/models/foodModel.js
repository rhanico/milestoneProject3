const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["appetizer", "main course", "dessert", "beverage", "other"],
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: [{
    type: String,
    enum: ["appetizer", "main course", "dessert", "beverage", "other"],
    required: true,
  }],
  
});

module.exports = mongoose.model("Food", FoodSchema);
