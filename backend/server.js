// MongoDB connection setup (server-side)
const mongoose = require('mongoose');
const cors = require("cors");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/collegeEventManager', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// API endpoints (server-side using Express.js)
const express = require('express');
const Club = require('./models/Club');
const Event = require('./models/Event');
const app = express();

app.use(express.json());
app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
  credentials: true,
  allowedHeaders: "Content-Type,Authorization"
}));

// Club endpoints
app.get('/api/clubs', async (req, res) => {
  try {
    const clubs = await Club.find().sort({ createdAt: -1 });
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/clubs', async (req, res) => {
  try {
    const club = new Club(req.body);
    await club.save();
    res.status(201).json(club);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Event endpoints
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/events', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/events/search', async (req, res) => {
  try {
    const { q } = req.query;
    let events;
    
    if (q) {
      events = await Event.find({
        $or: [
          { title: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } },
          { location: { $regex: q, $options: 'i' } },
          { hostName: { $regex: q, $options: 'i' } },
          { hostType: { $regex: q, $options: 'i' } }
        ]
      }).sort({ date: 1 });
    } else {
      events = await Event.find().sort({ date: 1 });
    }
    
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/events/:id/attendees', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    event.attendees.push({ name });
    await event.save();
    
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/events/verify', async (req, res) => {
  try {
    const { eventId, pin } = req.body;
    
    const event = await Event.findOne({ _id: eventId, pin });
    if (!event) {
      return res.status(404).json({ error: 'Invalid ID or PIN' });
    }
    
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Seed initial data
app.post('/api/seed', async (req, res) => {
  try {
    // Clear existing data
    await Club.deleteMany({});
    await Event.deleteMany({});
    
    // Seed clubs
    const clubs = await Club.insertMany([
      { name: "Tech Club", description: "Coding, hackathons, and talks.", imageDataUrl: "" },
      { name: "Cultural Society", description: "Fests and cultural events.", imageDataUrl: "" },
      { name: "Sports Council", description: "Sports meets and leagues.", imageDataUrl: "" },
    ]);
    
    res.json({ message: 'Database seeded successfully', clubs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});