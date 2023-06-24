const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClubSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  paddlers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Paddler",
    },
  ],
});

module.exports = mongoose.model("Club", ClubSchema);
