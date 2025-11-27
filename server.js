import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const apiKey = "AIzaSyASRdOmpPb4Ee1RvTJsP6vUyGlOw8KXDKc";

// Route API pour chercher des cafés
app.get("/api/cafes", async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) return res.status(400).json({ error: "Missing lat/lng" });

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=cafe&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Google API error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(3000, () => console.log("API running on http://localhost:3000"));
