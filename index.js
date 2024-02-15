require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;

// Serve static files
app.use(express.static("public"));

// Routes config
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Making the app listen on a port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
