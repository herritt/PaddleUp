const express = require("express");
const router = express.Router();
const Event = require("./models/event");

// Create a new event
router.post("/events", async (req, res) => {
  const event = new Event(req.body);
  try {
    await event.save();
    res.status(201).send(event);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all events
router.get("/events", async (req, res) => {
  try {
    const events = await Event.find({});
    res.send(events);
  } catch (err) {
    res.status(500).send();
  }
});

// Update an event by ID
router.patch("/events/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!event) {
      return res.status(404).send();
    }
    res.send(event);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete an event by ID
router.delete("/events/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).send();
    }
    res.send(event);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
