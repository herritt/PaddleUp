const shell = require("shelljs");
const fs = require("fs");

let populateSchedule = true;
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

// we now have a JSON file for the years Schedule
// that we want to add to the MongoDB
if (populateSchedule) {
  // Read the file
  const rawData = fs.readFileSync("./data/schedule2023.json", "utf8");

  // Parse the JSON data
  const scheduleData = JSON.parse(rawData);
}
