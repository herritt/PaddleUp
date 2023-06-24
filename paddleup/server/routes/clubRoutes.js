const express = require("express");
const router = express.Router();
const Club = require("../models/club");

// GET all clubs
router.get("/", async (req, res) => {
  try {
    const clubs = await Club.find();
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific club
router.get("/:id", getClub, (req, res) => {
  res.json(res.club);
});

// CREATE new club
router.post("/", async (req, res) => {
  const club = new Club({
    name: req.body.name,
    location: req.body.location,
    paddlers: req.body.paddlers,
  });

  try {
    const newClub = await club.save();
    res.status(201).json(newClub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a club
router.patch("/:id", getClub, async (req, res) => {
  if (req.body.name != null) {
    res.club.name = req.body.name;
  }
  if (req.body.location != null) {
    res.club.location = req.body.location;
  }
  if (req.body.paddlers != null) {
    res.club.paddlers = req.body.paddlers;
  }
  try {
    const updatedClub = await res.club.save();
    res.json(updatedClub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a club
router.delete("/:id", getClub, async (req, res) => {
  try {
    await res.club.remove();
    res.json({ message: "Deleted Club" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getClub(req, res, next) {
  let club;
  try {
    club = await Club.findById(req.params.id);
    if (club == null) {
      return res.status(404).json({ message: "Cannot find club" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.club = club;
  next();
}

module.exports = router;
