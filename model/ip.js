const mongoose = require("mongoose");

const ipSchema = new mongoose.Schema({
  type: { type: String, default: null, trim: true},
  endpoint: { type: String, unique: true, trim: true},
  status: { type: Number, default: 1 },
  updated_at: { type: Date, default: Date.now()},
  updated_at: { type: Date, default: Date.now()},
});

module.exports = mongoose.model("ip", ipSchema);