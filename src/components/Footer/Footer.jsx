import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div>
          <h2>Shahrzad</h2>
          <p>Luxury fashion, beauty, and commercial portfolio.</p>
        </div>
        <div className="footer-links">
          <a href="mailto:booking@shahrzad.studio">Email</a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="#hero">Back to top</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
