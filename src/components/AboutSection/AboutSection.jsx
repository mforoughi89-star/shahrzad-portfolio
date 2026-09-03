import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useImageReveal } from '../../hooks/useImageReveal.js';
import './AboutSection.css';

gsap.registerPlugin(ScrollTrigger);

const ABOUT_DEMO_PLACEHOLDER = '/images/optimized/about-portrait-01.jpg';

const defaultImages = [
  '/images/optimized/about-portrait-01.jpg',
  '/images/optimized/about-portrait-02.jpg',
  '/images/optimized/about-portrait-03.jpg',
  '/images/optimized/about-portrait-04.jpg',
];

const defaultData = {
  bio: 'With a fresh editorial presence and natural poise, Shahrzad brings versatility and expressive energy to commercial fashion, lookbooks, and beauty campaigns. She collaborates actively with photographers, stylists, and contemporary boutique brands.',
  compCard: {
    height: '165 cm / 5\'5"',
    weight: '55 kg / 121 lbs',
    eyes: 'Brown',
    hair: 'Dark Brown',
    top: 'EU 36 / US 4',
    bottom: 'EU 38 / US 6',
    shoes: 'EU 39 / US 8.5',
  },
  collaborations: [
    'Boutique Fashion & Apparel Labels',
    'Lookbooks & Online Store Catalogues',
    'Beauty, Skincare & Cosmetics Shoots',
    'Independent Photographers & Studio Projects',
  ],
  profileImage: defaultImages[0],
  images: defaultImages,
};

const AboutSection = ({ data }) => {
  const sectionRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const aboutData = { ...defaultData, ...data, compCard: { ...defaultData.compCard, ...data?.compCard } };
  const portraitImages = aboutData.images && aboutData.images.length > 0 ? aboutData.images : [aboutData.profileImage];

  useImageReveal(sectionRef);

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % portraitImages.length);
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + portraitImages.length) % portraitImages.length);
  };

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
          onClick={portraitImages.length > 1 ? nextImage : undefined}
          style={{ cursor: portraitImages.length > 1 ? 'pointer' : 'default' }}
          title={portraitImages.length > 1 ? 'Click to view next portrait' : undefined}
        >
          {portraitImages.map((src, index) => (
            <img
              key={src}
              className={`about-portrait img-reveal ${index === currentImageIndex ? 'active' : ''}`}
              src={src}
              alt={`Shahrzad — professional portrait ${index + 1}`}
              width="800"
              height="1067"
              onError={handleAboutImageError}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              style={{
                position: index === 0 ? 'relative' : 'absolute',
                top: 0,
                left: 0,
                opacity: index === currentImageIndex ? 1 : 0,
                pointerEvents: index === currentImageIndex ? 'auto' : 'none',
                transition: 'opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
            />
          ))}

          {portraitImages.length > 1 && (
            <>
              <div className="about-gallery-counter">
                {String(currentImageIndex + 1).padStart(2, '0')} / {String(portraitImages.length).padStart(2, '0')}
              </div>

              <div className="about-gallery-controls">
                <button
                  type="button"
                  className="about-gallery-btn"
                  onClick={prevImage}
                  aria-label="Previous portrait"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                <div className="about-gallery-dots">
                  {portraitImages.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`about-gallery-dot ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      aria-label={`Go to portrait ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  className="about-gallery-btn"
                  onClick={nextImage}
                  aria-label="Next portrait"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
