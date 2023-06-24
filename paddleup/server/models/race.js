const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RaceSchema = new Schema({
  distance: {
    type: Number,
    required: true,
  },
  ageCategory: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  paddlers: [
    {
      paddler: {
        type: Schema.Types.ObjectId,
        ref: "Padller",
      },
      time: Number,
    },
  ],
});

module.exports = mongoose.model("Race", RaceSchema);
