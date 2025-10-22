// components/ManageEvent.js
import { useState } from 'react';
import { verifyEvent, addAttendee } from '../services/manage_service';
import Toast from './Toast';

const ManageEvent = () => {
  const [unlockForm, setUnlockForm] = useState({
    eventId: '',
    pin: ''
  });
  const [attendeeForm, setAttendeeForm] = useState({
    name: ''
  });
  const [currentEvent, setCurrentEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUnlockChange = (e) => {
    const { name, value } = e.target;
    setUnlockForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAttendeeChange = (e) => {
    const { name, value } = e.target;
    setAttendeeForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUnlockSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const event = await verifyEvent(unlockForm.eventId, unlockForm.pin);
      if (!event) {
        setToastMessage('Invalid ID or PIN');
        return;
      }

      setCurrentEvent(event);
      setAttendees(event.attendees || []);
      setToastMessage('Event unlocked successfully!');
    } catch (err) {
      setToastMessage('Invalid ID or PIN');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAttendee = async (e) => {
    e.preventDefault();
    
    try {
      const updatedEvent = await addAttendee(currentEvent._id, attendeeForm.name);
      setAttendees(updatedEvent.attendees || []);
      setAttendeeForm({ name: '' });
      setToastMessage('Attendee added!');
    } catch (err) {
      setToastMessage('Error adding attendee');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Manage Event</h2>
      
      {!currentEvent ? (
        <form onSubmit={handleUnlockSubmit}>
          <div>
            <label htmlFor="unlockEventId">Event ID</label>
            <input
              type="text"
              id="unlockEventId"
              name="eventId"
              value={unlockForm.eventId}
              onChange={handleUnlockChange}
              required
            />
          </div>
          <div>
            <label htmlFor="unlockPin">PIN</label>
            <input
              type="text"
              id="unlockPin"
              name="pin"
              value={unlockForm.pin}
              onChange={handleUnlockChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Verifying...' : 'Unlock Event'}
          </button>
        </form>
      ) : (
        <div className="manager-panel">
          <h3>Managing: {currentEvent.title}</h3>
          
          <h4>Add Attendee</h4>
          <form onSubmit={handleAddAttendee}>
            <div>
              <label htmlFor="attendeeName">Attendee Name</label>
              <input
                type="text"
                id="attendeeName"
                name="name"
                value={attendeeForm.name}
                onChange={handleAttendeeChange}
                required
              />
            </div>
            <button type="submit">Add Attendee</button>
          </form>
          
          <h4>Attendees List ({attendees.length})</h4>
          {attendees.length === 0 ? (
            <p>No attendees yet.</p>
          ) : (
            <ul className="attendees-list">
              {attendees.map((attendee, index) => (
                <li key={index}>{attendee.name}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <Toast message={toastMessage} />
    </div>
  );
};

export default ManageEvent;