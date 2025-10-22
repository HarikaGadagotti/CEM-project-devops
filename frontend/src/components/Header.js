// components/Header.js
const Header = ({ currentSection, navigateTo }) => {
  const sections = ["home", "events", "host", "manage", "clubs"];

  return (
    <header>
      <nav className="nav" aria-label="Main navigation">
        <a 
          href="#home" 
          className="brand" 
          onClick={(e) => {
            e.preventDefault();
            navigateTo('home');
          }}
        >
          College Events
        </a>

        <div className="tabs" role="tablist">
          {sections.map(section => (
            <a
              key={section}
              href={`#${section}`}
              className={`tab ${currentSection === section ? 'active' : ''}`}
              role="tab"
              aria-selected={currentSection === section}
              aria-current={currentSection === section ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault();
                navigateTo(section);
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;