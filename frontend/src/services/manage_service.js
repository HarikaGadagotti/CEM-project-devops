// services/api.js (add these functions)
const API_BASE = process.env.API_URL || 'http://localhost:5000';


export const verifyEvent = async (eventId, pin) => {
  try {
    const response = await fetch(`${API_BASE}/api/events/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ eventId, pin })
    });
    
    if (!response.ok) throw new Error('Failed to verify event');
    return await response.json();
  } catch (error) {
    console.error('Error verifying event:', error);
    throw error;
  }
};

export const addAttendee = async (eventId, name) => {
  try {
    const response = await fetch(`${API_BASE}/api/events/${eventId}/attendees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    });
    
    if (!response.ok) throw new Error('Failed to add attendee');
    return await response.json();
  } catch (error) {
    console.error('Error adding attendee:', error);
    throw error;
  }
};