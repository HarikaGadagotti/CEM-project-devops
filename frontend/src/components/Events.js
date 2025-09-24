// components/Events.js
import { useState, useEffect } from 'react';
import { readEvents, searchEvents } from '../services/events_service';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Load events on component mount
  useEffect(() => {
    loadEvents();
  }, []);

  // Filter events when search query changes
  useEffect(() => {
    filterEvents();
  }, [searchQuery, events]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const eventsData = await readEvents();
      const sortedEvents = eventsData.sort((a, b) => 
        (a.date || "").localeCompare(b.date || "")
      );
      setEvents(sortedEvents);
      setError(null);
    } catch (err) {
      setError('Error loading events');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = async () => {
    if (!searchQuery.trim()) {
      setFilteredEvents(events);
      return;
    }

    try {
      const searchResults = await searchEvents(searchQuery);
      const sortedResults = searchResults.sort((a, b) => 
        (a.date || "").localeCompare(b.date || "")
      );
      setFilteredEvents(sortedResults);
    } catch (err) {
      console.error('Error searching events:', err);
      setFilteredEvents(events);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const navigateToHost = () => {
    window.location.hash = 'host';
  };

  if (loading) return <div>Loading events...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h2>Events</h2>
      
      <div className="search-box">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <div className="events-list">
        {filteredEvents.length === 0 ? (
          <div className="empty">
            <strong>No events yet</strong>
            <div>Be the first to host one!</div>
            <div style={{ marginTop: '10px' }}>
              <button className="btn" onClick={navigateToHost}>
                Create Event
              </button>
            </div>
          </div>
        ) : (
          filteredEvents.map(event => (
            <div key={event._id} className="event">
              <img 
                src={event.imageDataUrl || ''} 
                alt={event.title}
              />
              <div>
                <h4>{event.title}</h4>
                <div className="meta">
                  {event.date} {event.time} @ {event.location}
                </div>
                <div>{event.description}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Events;