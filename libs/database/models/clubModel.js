const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
  
  devclub: {
    type: Array,
    required: true,
  },
});

const Club = mongoose.models.Club || mongoose.model("Club", clubSchema);

module.exports = Club;
