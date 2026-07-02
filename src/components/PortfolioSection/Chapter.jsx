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
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: chapterRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(chapterRef.current.querySelectorAll('.chapter-image-wrapper'), {
        y: 28,
        duration: 0.7,
        stagger: 0.08,
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

  const chapterModifier = title === 'Studio & Monochrome' ? ' chapter--studio' : '';

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
            <LazyImage
              src={image.url}
              alt={image.alt || `${title} ${index + 1}`}
              className="chapter-lazy-image img-reveal"
              imageClassName="chapter-image"
            />
            <figcaption className="chapter-image-overlay">
              <span>{image.caption || title}</span>
            </figcaption>
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
