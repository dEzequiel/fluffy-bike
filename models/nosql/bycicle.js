const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

/// Bycicle Schema
/// Bycicle Model
///

const BycicleSchema = new mongoose.Schema(
  {
    name: { type: String }, //unique: true
    brand: {
      type: ["All City", "Argon 18", "Bulls", "CUBE"],
      default: "All City",
    },
    price: {
      type: Number,
      validate: (value) => {
        if (value < 0) {
          throw new Error("Price must be a positive number");
        }
      },
    },
    type: { type: ["Road", "Mountain", "Urban", "BMX"], default: "Road" },
    frame: { type: ["Aluminium", "Carbon", "Steel"] },
    fork: { type: ["XC", "Trail", "Enduro", "Downhill"] },
    gears: {
      type: [
        "Single speed",
        "Fixed gear",
        "Derailleur gears",
        "Internal gear hub",
      ],
      default: "Single speed",
    },
    brakes: {
      type: ["Hydraulic Disc", "Rim", "Mechanical Disc", "Coaster"],
      default: "Hydraulic Disc",
    },
    wheels: { type: ["700c", "27.5", "24"] },
    tires: {
      type: [
        "Road tires",
        "Mountain bike tires",
        "Hybrid tires",
        "Commuter tires",
        "Touring tires",
      ],
    },
    suspension: { type: ["Hardtail", "Full", "Rigid"], default: "Hardtail" },
    weight: {
      type: Number,
      validate: (value) => {
        if (value < 0) {
          throw new Error("Weight must be a positive number");
        }
      },
    },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true, // createdAt, updatedAt
    versionKey: false, // __v
  }
);

// For testing purposes, this way Model decides which colletion uses
// depending on the environment variable.

if (process.env.NODE_ENV === "development") {
  BycicleSchema.set("collection", "Testing");
}

BycicleSchema.statics.findByName = function (name) {
  return this.findOne({ name: name });
};

module.exports = mongoose.model("bycicles", BycicleSchema);
