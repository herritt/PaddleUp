const shell = require("shelljs");

// Run the Python script
shell.exec("python dataPopulator.py", (code, stdout, stderr) => {
  if (code === 0) {
    console.log("dataPopulator.py executed successfully");
  } else {
    console.error("Failed to execute dataPopulator.py:", stderr);
  }
});
