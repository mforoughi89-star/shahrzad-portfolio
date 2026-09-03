import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LazyImage from '../LazyImage/LazyImage.jsx';
import { useImageReveal } from '../../hooks/useImageReveal.js';
import './Chapter.css';

gsap.registerPlugin(ScrollTrigger);

const Chapter = ({ title, description, images, layout = 'grid', number }) => {
  const chapterRef = useRef(null);

  useImageReveal(chapterRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(chapterRef.current.querySelector('.chapter-header'), {
        y: 55,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: chapterRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(chapterRef.current.querySelectorAll('.chapter-image-wrapper'), {
        y: 28,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: chapterRef.current,
          start: 'top 72%',
          toggleActions: 'play none none none',
        },
      });
    }, chapterRef);

    return () => ctx.revert();
  }, []);

  const chapterModifier = '';

  return (
    <article ref={chapterRef} className={`chapter${chapterModifier}`}>
      <div className="chapter-header">
        <span className="chapter-number">{String(number).padStart(2, '0')}</span>
        <div>
          <h3 className="chapter-title">{title}</h3>
          <p className="chapter-description">{description}</p>
        </div>
      </div>
      <div className={`chapter-grid ${layout}`}>
        {images.map((image, index) => (
          <figure key={`${title}-${index}`} className="chapter-image-wrapper">
            {image.url ? (
              <>
                <LazyImage
                  src={image.url}
                  alt={image.alt || `${title} ${index + 1}`}
                  className="chapter-lazy-image img-reveal"
                  imageClassName="chapter-image"
                />
                <figcaption className="chapter-image-overlay">
                  <span>{image.caption || title}</span>
                </figcaption>
              </>
            ) : (
              <div className="chapter-placeholder">
                <div className="chapter-placeholder-inner">
                  <span className="placeholder-number">{String(index + 1).padStart(2, '0')}</span>
                  <svg
                    className="placeholder-icon"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span className="placeholder-label">{image.caption || 'Upcoming Look'}</span>
                </div>
              </div>
            )}
          </figure>
        ))}
      </div>
      {images.length > 4 && (
        <a className="chapter-mobile-link" href="#booking">
          View full chapter
        </a>
      )}
    </article>
  );
};

export default Chapter;
