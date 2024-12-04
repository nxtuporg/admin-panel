const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  body: {
    type: String,
  },
  image: {
    type: String,
  },
  clubs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
    },
  ],
  clans: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clans",
    },
  ],
});

module.exports = mongoose.models.Event || mongoose.model("Event", eventSchema);

///////// WORK IN PROGRESS ////////

// const mongoose = require("mongoose");

// const CLANS = ["A", "B", "C", "D"];

// const clubSchema = new mongoose.Schema({
//     name: {
//       type: String,
//       required: true,
//     },
//   });

//   const eventSchema = new mongoose.Schema({
//     name: {
//       type: String,
//       required: true,
//     },
//     date: {
//       type: Date,
//       required: true,
//     },
//     description: {
//       type: String,
//     },
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       refPath: "creatorModel",
//     },
//     creatorModel: {
//       type: String,
//       required: true,
//       enum: ["Clan", "Club"],
//     },
//   });

//   const clanSchema = new mongoose.Schema({
//     name: {
//       type: String,
//       required: true,
//       enum: CLANS,
//     },
//   });

//   const Clan = mongoose.model("Clan", clanSchema);
//   const Club = mongoose.model("Club", clubSchema);
//   const Event = mongoose.model("Event", eventSchema);

//   module.exports = { Clan, Club, Event };
