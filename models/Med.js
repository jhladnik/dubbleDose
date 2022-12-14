const mongoose = require("mongoose");

const MedSchema =  new mongoose.Schema({
  substance: {
    type: String,
  },
  notes: {
    type: String,
  },
  dosage: {
    type: String,
    required: true,
  },
  times: {
    type: Number,
    required: true,
  },
  lastTaken: {
    type: String,
    default: new Date().toString(),
  },
  type: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Med", MedSchema);