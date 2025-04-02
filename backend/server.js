require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for all frontend requests
app.use(express.json()); // Allow JSON data

// ✅ Default Route (Fixes "Cannot GET /" error)
app.get("/", (req, res) => {
  res.send("🚀 Express Server is Running!");
});

// ✅ Proxy Route to Fetch API Data
app.get("/api/proxy", async (req, res) => {
  try {
    const apiUrl = "https://webscrapper.inside-ai.xyz/";
    
    // Fetch data from the external API
    const response = await axios.get(apiUrl);

    res.json(response.data); // Send the API response to frontend
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Failed to fetch data from API" });
  }
});

// Start the Express Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
