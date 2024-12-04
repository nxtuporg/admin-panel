const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  head: {
    type: String,
    required: true,
  },
  subHead: {
    type: String,
    required: false,
  },
  members: {
    type: [
      {
        memberEnrollment: { type: String, required: true },
        name: { type: String, required: true },
        role: { type: String, required: true },
        email: { type: String, required: true },
      },
    ],
    default: [],
  },
});

const Club = mongoose.models.Club || mongoose.model("Club", clubSchema);

module.exports = Club;
