// services/api.js (writeEvent function)
const API_BASE = process.env.API_URL || 'http://localhost:5000';

export const writeEvent = async (eventData) => {
  try {
    const response = await fetch(`${API_BASE}/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    });
    
    if (!response.ok) throw new Error('Failed to save event');
    return await response.json();
  } catch (error) {
    console.error('Error saving event:', error);
    throw errror;
  }
};