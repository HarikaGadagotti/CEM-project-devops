// components/Home.js
const Home = ({ navigateTo }) => {
  return (
    <section id="home">
      <h1 className="text-balance">College Event Management</h1>
      <p className="lead">Host and manage events by students, clubs, and faculty. Handle registrations, attendance, and simple paid tickets.</p>

      <div className="grid cols-4">
        <div className="card">
          <h3>Browse Events</h3>
          <div className="muted">See upcoming events and register</div>
          <div className="spacious">
            <button className="btn block" onClick={() => navigateTo('events')}>
              View Events
            </button>
          </div>
        </div>

        {/* Other cards with similar navigation */}
      </div>
    </section>
  );
};

export default Home;