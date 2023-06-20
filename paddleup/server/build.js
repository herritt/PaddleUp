require("dotenv").config();

const express = require("express");
const Event = require("./models/event");

const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 3001;

const shell = require("shelljs");
const fs = require("fs");

let populateSchedule = false;
let fetchData = false;

// Run the Python script to fetch data from internet
if (fetchData) {
  shell.exec("python fetchData.py", (code, stdout, stderr) => {
    if (code === 0) {
      console.log("fetchData.py executed successfully");
    } else {
      console.error("Failed to execute fetchData.py:", stderr);
    }
  });
}

//mongodb setup
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGO_URI;

//connect to mongoDB using mongoose
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error", err));

// we now have a JSON file for the years Schedule
// that we want to add to the MongoDB
if (populateSchedule) {
  // Read the file
  const rawData = fs.readFileSync("./data/schedule2023.json", "utf8");

  // Parse the JSON data
  const scheduleData = JSON.parse(rawData);

  Event.insertMany(scheduleData);
}
