const express = require("express");
const router = express.Router();
const Race = require("../models/race");

// GET all races
router.get("/", async (req, res) => {
  try {
    const races = await Race.find();
    res.json(races);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific race
router.get("/:id", getRace, (req, res) => {
  res.json(res.race);
});

// CREATE new race
router.post("/", async (req, res) => {
  const race = new Race({
    name: req.body.name,
    distance: req.body.distance,
    sex: req.body.sex,
    paddlers: req.body.paddlers,
  });

  try {
    const newRace = await race.save();
    res.status(201).json(newRace);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a race
router.patch("/:id", getRace, async (req, res) => {
  if (req.body.name != null) {
    res.race.name = req.body.name;
  }
  if (req.body.distance != null) {
    res.race.distance = req.body.distance;
  }
  if (req.body.sex != null) {
    res.race.sex = req.body.sex;
  }
  if (req.body.paddlers != null) {
    res.race.paddlers = req.body.paddlers;
  }
  try {
    const updatedRace = await res.race.save();
    res.json(updatedRace);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a race
router.delete("/:id", getRace, async (req, res) => {
  try {
    await res.race.remove();
    res.json({ message: "Deleted Race" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getRace(req, res, next) {
  let race;
  try {
    race = await Race.findById(req.params.id);
    if (race == null) {
      return res.status(404).json({ message: "Cannot find race" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.race = race;
  next();
}

module.exports = router;
