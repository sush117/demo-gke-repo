const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Configurable values (important for CI/CD later)
const VERSION = process.env.VERSION || "Hello from THE COOK 🚀";
const MESSAGE = process.env.MESSAGE || "Yo, yo, yo, 148, 3 to the 3 to the 6 to the 9, representin’ the ABQ. What up, biatch? Leave it at the tone!";

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