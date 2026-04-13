const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Configurable values (important for CI/CD later)
const VERSION = process.env.VERSION || "THIS IS MY OWN PRIVATE DOMICILE AND I WILL NOT BE HARRASSED 🚀";
const MESSAGE = process.env.MESSAGE || "BIYATCHHHHHH";

// Root UI
app.get("/", (req, res) => {
  res.send(`
    <h1>${VERSION}</h1>
    <h2>Version: ${MESSAGE}</h2>
  `);
});

// API endpoint
app.get("/api/info", (req, res) => {
  res.json({
    version: VERSION,
    message: MESSAGE,
    timestamp: new Date()
  });
});

// Health check (for Kubernetes)
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});