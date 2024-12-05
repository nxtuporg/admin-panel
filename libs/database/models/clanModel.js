const mongoose = require("mongoose")

const clanSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    leader:{
        type: String,
        required: true,
    },
    viceLeader:{
        type: String,
        required: true,
    },
    points:{
        type: Number,
        required: true,
    },
    topPerformers:{
        type: Array,
        required: true,
    },
})


module.exports = mongoose.models.Clan || mongoose.model("Clan", clanSchema);