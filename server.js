
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("Emergency SOS website is running on port " + PORT);
});