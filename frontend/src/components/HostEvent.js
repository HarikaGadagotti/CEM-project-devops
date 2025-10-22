// components/HostEvent.js
import { useState } from 'react';
import { writeEvent } from '../services/events_service';
import Toast from './Toast';

const HostEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    hostName: '',
    hostType: ''
  });
  const [toastMessage, setToastMessage] = useState('');
  const [createdEvent, setCreatedEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generatePin = () => {
    return String(Math.floor(1000 + Math.random() * 9000));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newEvent = await writeEvent({
        ...formData,
        pin: generatePin(),
        imageDataUrl: ""
      });
      
      setToastMessage('Event created!');
      setCreatedEvent(newEvent);
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        hostName: '',
        hostType: ''
      });
    } catch (err) {
      setToastMessage('Error creating event');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Host an Event</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Event Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="hostName">Host Name</label>
          <input
            type="text"
            id="hostName"
            name="hostName"
            value={formData.hostName}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="hostType">Host Type</label>
          <select
            id="hostType"
            name="hostType"
            value={formData.hostType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select type</option>
            <option value="Club">Club</option>
            <option value="Society">Society</option>
            <option value="Organization">Organization</option>
            <option value="Individual">Individual</option>
          </select>
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </form>

      {createdEvent && (
        <div className="result-message">
          Event created with ID {createdEvent._id} and PIN {createdEvent.pin}
        </div>
      )}

      <Toast message={toastMessage} />
    </div>
  );
};

export default HostEvent;