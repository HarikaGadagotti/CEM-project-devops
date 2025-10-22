// components/Clubs.js
import { useState, useEffect } from 'react';
import { readClubs, writeClub } from '../services/club_service';
import Toast from './Toast';

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  // Load clubs on component mount
  useEffect(() => {
    loadClubs();
  }, []);

  const loadClubs = async () => {
    try {
      setLoading(true);
      const clubsData = await readClubs();
      setClubs(clubsData);
      setError(null);
    } catch (err) {
      setError('Error loading clubs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await writeClub({ 
        ...formData, 
        imageDataUrl: "" 
      });
      setToastMessage('Club added!');
      setFormData({ name: '', description: '' });
      await loadClubs(); // Reload clubs after adding
    } catch (err) {
      setToastMessage('Error adding club');
      console.error(err);
    }
  };

  if (loading) return <div>Loading clubs...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h2>Clubs</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="clubName">Club Name</label>
          <input
            type="text"
            id="clubName"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="clubDesc">Description</label>
          <textarea
            id="clubDesc"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Club</button>
      </form>

      <div className="club-grid">
        {clubs.map(club => (
          <div key={club._id} className="club-card">
            <img 
              className="club-logo" 
              src={club.imageDataUrl || ''} 
              alt={club.name} 
            />
            <div>
              <h4>{club.name}</h4>
              <p>{club.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Toast message={toastMessage} />
    </div>
  );
};

export default Clubs;