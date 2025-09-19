const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Contact = require("./models/contact.js");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ MongoDB connection error:", err));

// POST API for saving contact form data
app.post("/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newContact = new Contact({ name, email, message });
        await newContact.save();

        res.status(201).json({ message: "Message saved successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error saving message" });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
});
