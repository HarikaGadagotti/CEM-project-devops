// components/Footer.js
import { useEffect, useState } from 'react';

const Footer = ({ showFooter = true }) => {
  const [year, setYear] = useState('');

  useEffect(() => {
    // Set the current year
    setYear(new Date().getFullYear().toString());
  }, []);

  if (!showFooter) return null;

  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="footer-left">
        <div style={{ fontWeight: '700' }}>College Events</div>
        <div className="muted" style={{ fontSize: '13px' }}>
          © <span id="footerYear">{year}</span> College Events
        </div>
      </div>

      <div className="footer-right">
        <nav className="social-links" aria-label="Social links">
          {/* Instagram */}
          <a 
            className="social-link" 
            href="https://www.instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Instagram"
          >
            <svg className="social-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.2"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.2"/>
              <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/>
            </svg>
            <span className="sr-only">Instagram</span>
          </a>

          {/* Facebook */}
          <a 
            className="social-link" 
            href="https://www.facebook.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Facebook"
          >
            <svg class="social-icon"
            viewBox="0 0 24 24" 
            fill="none" aria-hidden="true">
            <path d="M15 8h2.5V5.5H15c-1.1 0-2 .9-2 2V10H11v2h2v6h2v-6h2.5l.5-2H15V7.5C15 7.22 15.22 7 15.5 7H18V5h-2.5C14.01 5 13 6.01 13 7.5V8z" 
            stroke="currentColor" stroke-width="0" fill="currentColor"/>
            </svg>
            <span className="sr-only">Facebook</span>
          </a>

          {/* Twitter */}
          <a 
            className="social-link" 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Twitter"
          >
            <svg className="social-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path 
                d="M20 7.5c-.6.3-1.2.5-1.9.6.7-.4 1.2-1 1.4-1.8-.6.3-1.4.6-2.1.7C16.9 6.2 16 6 15.2 6c-1.3 0-2.3 1-2.3 2.3 0 .2 0 .4.1.6C10.8 8.8 8.2 7.4 6.6 5.1c-.3.5-.5 1-.5 1.6 0 1.1.6 2 1.5 2.6-.5 0-1-.1-1.4-.4v.1c0 1.3.9 2.4 2.1 2.6-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3 2.3-1.1.9-2.5 1.4-4 1.4-.3 0-.7 0-1-.1C6.9 19 8.6 19.5 10.4 19.5c6.2 0 9.5-5.1 9.5-9.5v-.4c.7-.5 1.2-1.2 1.6-1.9-.6.3-1.3.6-2 .7z" 
                fill="currentColor"
              />
            </svg>
            <span className="sr-only">Twitter</span>
          </a>

          {/* CBIT Official */}
          <a 
            className="social-link" 
            href="https://www.cbit.ac.in" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="CBIT official site"
          >
            <svg className="social-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path 
                d="M12 3a9 9 0 100 18 9 9 0 000-18zm1 12.5V18h-2v-2.5H8.5v-1.5H11V10h2v4h2.5v1.5H13z" 
                fill="currentColor"
              />
            </svg>
            <span className="sr-only">CBIT official</span>
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;