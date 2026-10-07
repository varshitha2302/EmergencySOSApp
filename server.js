const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "Emergency SOS backend is working!"
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log("----------------------------------");
    console.log("🚨 EMERGENCY ASSISTANCE APP");
    console.log("----------------------------------");
    console.log("Server started successfully!");
    console.log("Open: http://localhost:5000");
    console.log("----------------------------------");
});