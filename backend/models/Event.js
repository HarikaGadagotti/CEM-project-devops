// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  hostName: {
    type: String,
    required: true
  },
  hostType: {
    type: String,
    required: true
  },
  pin: {
    type: String,
    required: true
  },
  imageDataUrl: {
    type: String,
    default: ""
  },
  attendees: [{
    name: String,
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);