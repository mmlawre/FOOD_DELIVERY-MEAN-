const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  itemName: { type: String, required: true },
  itemCategory: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

module.exports = mongoose.model("inventory", itemSchema,);
