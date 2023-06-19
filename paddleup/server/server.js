require("dotenv").config();

const express = require("express");
const eventRoutes = require("./routes/eventRoutes");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 3001;

// Enable CORS
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server response - root");
});

app.use("/api", eventRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

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
