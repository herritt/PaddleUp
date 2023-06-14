const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

// Enable CORS
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server response - root");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
