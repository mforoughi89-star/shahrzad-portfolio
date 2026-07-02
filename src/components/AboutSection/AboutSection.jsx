import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useImageReveal } from '../../hooks/useImageReveal.js';
import './AboutSection.css';

gsap.registerPlugin(ScrollTrigger);

const ABOUT_DEMO_PLACEHOLDER = 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=1067&fit=crop';

const defaultData = {
  bio: 'With a refined aesthetic and editorial sensibility, Shahrzad brings depth and versatility to high-fashion campaigns, beauty editorials, and luxury brand storytelling. She collaborates with photographers, creative directors, and brands who seek elevated visual narratives.',
  compCard: {
    height: '175 cm / 5\'9"',
    eyes: 'Hazel',
    hair: 'Dark Brown',
    dress: 'EU 36 / US 4',
    shoes: 'EU 38 / US 7.5',
  },
  collaborations: ['Vogue Italia', 'Harper\'s Bazaar', 'Selected luxury fashion houses', 'Leading beauty brands'],
  profileImage: '/images/about-portrait.jpg',
};

const AboutSection = ({ data }) => {
  const sectionRef = useRef(null);
  const aboutData = { ...defaultData, ...data, compCard: { ...defaultData.compCard, ...data?.compCard } };

  useImageReveal(sectionRef);

  const handleAboutImageError = (event) => {
    const image = event.currentTarget;

    if (!image.dataset.usedDemoPlaceholder) {
      image.dataset.usedDemoPlaceholder = 'true';
      image.src = ABOUT_DEMO_PLACEHOLDER;
      return;
    }

    image.onerror = null;
    image.removeAttribute('src');
    image.style.backgroundColor = '#0B0D10';
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelector('.about-divider'), {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-section" id="about">
      <div className="container about-container">
        <motion.div
          className="about-content"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <span className="section-kicker">Profile</span>
          <h2 className="section-title">About Shahrzad</h2>
          <p className="about-bio">{aboutData.bio}</p>

          <div className="comp-card">
            <h3 className="comp-card-title">Measurements</h3>
            <dl className="comp-card-list">
              {Object.entries(aboutData.compCard).map(([key, value]) => (
                <div className="comp-card-item" key={key}>
                  <dt>{key}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="collaborations">
            <h3 className="collaborations-title">Selected Collaborations</h3>
            <ul className="collaborations-list">
              {aboutData.collaborations.map((collab) => (
                <li key={collab}>{collab}</li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="about-divider" />

        <motion.div
          className="about-image-wrapper"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <img
            className="about-portrait img-reveal"
            src={aboutData.profileImage}
            alt="Shahrzad — professional portrait"
            width="800"
            height="1067"
            onError={handleAboutImageError}
            loading="lazy"
            decoding="async"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
