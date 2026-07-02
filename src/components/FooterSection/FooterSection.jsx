import React from 'react';
import './FooterSection.css';

const FooterSection = ({ data }) => {
  const defaultData = {
    name: 'Shahrzad',
    title: 'Fashion & Commercial Model',
    location: 'Based in Tehran, available worldwide.',
    instagram: {
      label: 'Instagram',
      handle: '@callme.shhrzd',
      url: 'https://instagram.com/callme.shhrzd',
    },
  };

  const footerData = { ...defaultData, ...data };

  return (
    <footer className="footer-section">
      <div className="container footer-inner">
        <h2 className="footer-name">{footerData.name}</h2>

        <p className="footer-title">{footerData.title}</p>

        <p className="footer-location">{footerData.location}</p>

        {footerData.instagram && (
          <a
            href={footerData.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-instagram"
            aria-label={`${footerData.name} on Instagram`}
          >
            {footerData.instagram.handle}
          </a>
        )}

        <p className="footer-copyright">
          © {new Date().getFullYear()} {footerData.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
