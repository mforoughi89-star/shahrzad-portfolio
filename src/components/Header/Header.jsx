import React, { useEffect, useState } from 'react';
import './Header.css';

const links = [
  { label: 'Portfolio', target: 'portfolio' },
  { label: 'Profile', target: 'about' },
  { label: 'Services', target: 'services' },
  { label: 'Booking', target: 'booking' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <button className="brand-mark" onClick={() => scrollToSection('hero')} aria-label="Go to hero section">
        Shahrzad
      </button>
      <nav className="site-nav" aria-label="Main navigation">
        {links.map((link) => (
          <button key={link.target} onClick={() => scrollToSection(link.target)}>
            {link.label}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;
