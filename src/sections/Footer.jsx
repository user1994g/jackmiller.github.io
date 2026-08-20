import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="site-footer" id="contact">
    <div className="site-footer__main studio-wrap">
      <div>
        <span className="tape-label">Open for selected work</span>
        <p className="site-footer__availability">
          Have a story worth <em>cutting?</em>
        </p>
      </div>

      <nav className="site-footer__links" aria-label="Footer navigation">
        <Link to="/contact">Start a project ↗</Link>
        <Link to="/videos">Videos</Link>
        <Link to="/photos">Photos</Link>
        <Link to="/about">About</Link>
        <Link to="/write-ups">Write Ups</Link>
      </nav>
    </div>

    <div className="site-footer__bottom studio-wrap">
      <span>© {new Date().getFullYear()} Jack Miller Media</span>
      <span>Made in the edit · UK</span>
      <span className="site-footer__policies">
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
      </span>
    </div>
  </footer>
);

export default Footer;
