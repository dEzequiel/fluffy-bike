const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Schema = mongoose.Schema;
const BycicleModel = require("./bycicle.js");

dotenv.config();

const ShopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bycicles: [{ type: Schema.Types.ObjectId, ref: "Bycicle" }],
});

if (process.env.NODE_ENV === "development") {
  ShopSchema.set("collection", "Shop-Testing");
}

// ShopSchema.post("remove", (document) => {
//   const shopId = document._id;
//   BycicleModel.find({ shops: { $in: [shopId] } }).then((bycicles) => {
//     Promise.all(
//       bycicles.map((bycicle) =>
//         BycicleModel.findOneAndUpdate(
//           bycicle._id,
//           { $pull: { shops: shopId } },
//           { new: true }
//         )
//       )
//     );
//   });
// });

module.exports = mongoose.model("Shop", ShopSchema);

// country: { type: String },
// city: { type: String },
// address: { type: String },
// phone: { type: String },
// email: { type: String },
