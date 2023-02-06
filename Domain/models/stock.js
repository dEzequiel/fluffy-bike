const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Schema = mongoose.Schema;
dotenv.config();

const StockSchema = new mongoose.Schema({
  shop: { type: Schema.Types.ObjectId },
  bycicles: [
    {
      bycicle: { type: Schema.Types.ObjectId, ref: "Bycicle" },
      quantity: { type: Number },
    },
  ],
});

if (process.env.NODE_ENV === "development") {
  StockSchema.set("collection", "Stock-Testing");
}

module.exports = mongoose.model("Stock", StockSchema);
