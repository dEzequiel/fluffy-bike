const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Schema = mongoose.Schema;

const RentSchema = new mongoose.Schema({
  shop: { type: Schema.Types.ObjectId },
  bycicles: [
    {
      bycicle: { type: Schema.Types.ObjectId, ref: "Bycicle" },
      available: { type: Boolean, default: true },
    },
  ],
});

if (process.env.NODE_ENV === "development") {
  RentSchema.set("collection", "Rent-Testing");
}

module.exports = mongoose.model("Rent", RentSchema);
