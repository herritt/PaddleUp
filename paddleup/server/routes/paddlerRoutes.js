const express = requie("express");
const router = express.Router();
const Paddler = require("../models/paddler");

// GET all paddlers
router.get("/", async (req, res) => {
  try {
    const paddlers = await Paddler.find();
    res.json(paddlers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific paddler
router.get("/:id", getPaddler, (req, res) => {
  res.json(res.paddler);
});

// CREATE new paddler
router.post("/", async (req, res) => {
  const paddler = new Paddler({
    name: req.body.name,
    sex: req.body.sex,
    age: req.body.age,
    club: req.body.club,
  });

  try {
    const newPaddler = await paddler.save();
    res.status(201).json(newPaddler);
  } catch (err) {
    res.status(400).jsoan({ message: err.message });
  }
});

// UPDATE a paddler
router.patch("/:id", getPaddler, async (req, res) => {
  if (req.body.name != null) {
    res.paddler.name = req.body.name;
  }
  if (req.body.sex != null) {
    res.paddler.sex = req.body.sex;
  }
  if (req.body.age != null) {
    res.paddler.age = req.body.age;
  }
  if (req.body.club != null) {
    res.paddler.club = req.body.club;
  }
  try {
    const updatedPaddler = await res.paddler.save();
    res.json(updatedPaddler);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a paddler
router.delete("/:id", getPaddler, async (req, res) => {
  try {
    await res.paddler.remove();
    res.json({ message: "Deleted Paddler" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getPaddler(req, res, next) {
  let paddler;
  try {
    paddler = await Paddler.findById(req.params.id);
    if (paddler == null) {
      return res.status(404).json({ message: "Cannot find paddler" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.paddler = paddler;
  next();
}

module.exports = router;
