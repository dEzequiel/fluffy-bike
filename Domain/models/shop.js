const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Schema = mongoose.Schema;
dotenv.config();

const ShopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stock: { type: Schema.Types.ObjectId, ref: "Stock" },
});

if (process.env.NODE_ENV === "development") {
  ShopSchema.set("collection", "Shop-Testing");
}

module.exports = mongoose.model("Shop", ShopSchema);

// country: { type: String },
// city: { type: String },
// address: { type: String },
// phone: { type: String },
// email: { type: String },
