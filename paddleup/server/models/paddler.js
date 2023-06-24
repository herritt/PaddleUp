const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaddlerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  club: {
    type: Schema.Types.ObjectId,
    ref: "Club",
  },
  pastClubs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Club",
    },
  ],
  bestTimes: [
    {
      race: {
        type: Schema.Types.ObjectId,
        ref: "Race",
      },
      time: Number,
    },
  ],
});

module.exports = mongoose.model("Paddler", PaddlerSchema);
