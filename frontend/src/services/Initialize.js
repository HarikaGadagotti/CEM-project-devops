// services/api.js (add these functions)
const API_BASE = process.env.API_URL || 'http://localhost:5000';

export const initStore = async () => {
  try {
    // Check if we have any clubs
    const response = await fetch(`${API_BASE}/api/clubs`);
    if (response.ok) {
      const clubs = await response.json();
      if (clubs.length === 0) {
        // Seed initial data if no clubs exist
        await fetch(`${API_BASE}/seed`, { method: 'POST' });
        console.log('Initial data seeded');
      }
    }
  } catch (error) {
    console.error('Error initializing store:', error);
  }
};

export const seedDatabase = async () => {
  try {
    const response = await fetch(`${API_BASE}/seed`, { method: 'POST' });
    if (!response.ok) throw new Error('Failed to seed database');
    return await response.json();
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};