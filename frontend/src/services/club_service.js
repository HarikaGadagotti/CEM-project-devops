// services/api.js
const API_BASE = process.env.API_URL || 'http://localhost:5000';

// Function to fetch clubs from MongoDB
export const readClubs = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/clubs`);
    if (!response.ok) throw new Error('Failed to fetch clubs');
    return await response.json();
  } catch (error) {
    console.error('Error fetching clubs:', error);
    return [];
  }
};

// Function to save a club to MongoDB
export const writeClub = async (clubData) => {
  try {
    const response = await fetch(`${API_BASE}/api/clubs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(clubData)
    });
    
    if (!response.ok) throw new Error('Failed to save club');
    return await response.json();
  } catch (error) {
    console.error('Error saving club:', error);
    throw error;
  }
};

// Utility function
export const uid = () => Math.random().toString(36).slice(2, 8);