// services/api.js (add these functions)
const API_BASE = process.env.API_URL || 'http://localhost:5000';

export const readEvents = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/events`);
    if (!response.ok) throw new Error('Failed to fetch events');
    return await response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

export const searchEvents = async (query) => {
  try {
    const response = await fetch(`${API_BASE}/api/events/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search events');
    return await response.json();
  } catch (error) {
    console.error('Error searching events:', error);
    return [];
  }
};

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
    throw error;
  }
};