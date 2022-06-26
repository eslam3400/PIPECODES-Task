const mongoose = require("mongoose")

module.exports = mongoose.model("Question", new mongoose.Schema({
  name: { type: String, required: [true, "name must be provided!"] },
  email: { type: String, required: [true, "email must be provided!"] },
  observations: String,
  date: { type: Date, required: [true, "date must be provided"] },
  createdAt: { type: Date, default: Date.now }
}))