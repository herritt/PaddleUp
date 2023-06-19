const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  Date: {
    type: Date,
    required: true,
  },
  Event: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Event", EventSchema);
