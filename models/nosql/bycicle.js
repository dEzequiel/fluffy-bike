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
      type: String,
      enum: ["All City", "Argon 18", "Bulls", "CUBE"],
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
    type: {
      type: String,
      enum: ["Road", "Mountain", "Urban", "BMX"],
    },
    frame: { type: String, enum: ["Aluminium", "Carbon", "Steel"] },
    fork: { type: String, enum: ["XC", "Trail", "Enduro", "Downhill"] },
    gears: {
      type: String,
      enum: [
        "Single speed",
        "Fixed gear",
        "Derailleur gears",
        "Internal gear hub",
      ],
    },
    brakes: {
      type: String,
      enum: ["Hydraulic Disc", "Rim", "Mechanical Disc", "Coaster"],
    },
    wheels: { type: String, enum: ["700c", "27.5", "24"] },
    tires: {
      type: String,
      enum: [
        "Road tires",
        "Mountain bike tires",
        "Hybrid tires",
        "Commuter tires",
        "Touring tires",
      ],
    },
    suspension: { type: String, enum: ["Hardtail", "Full", "Rigid"] },
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
