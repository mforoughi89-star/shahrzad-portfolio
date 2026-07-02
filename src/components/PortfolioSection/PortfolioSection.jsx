import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Chapter from './Chapter.jsx';
import './PortfolioSection.css';

gsap.registerPlugin(ScrollTrigger);

const defaultChapters = [
  {
    title: 'Urban Stories',
    description: 'Contemporary fashion meets architectural landscapes and metropolitan energy.',
    layout: 'horizontal',
    images: [
      { url: '/images/urban-1.jpg', fallbackId: 1031, alt: 'Urban Stories — look 1', caption: 'Look 01' },
      { url: '/images/urban-2.jpg', fallbackId: 1011, alt: 'Urban Stories — look 2', caption: 'Look 02' },
      { url: '/images/urban-3.jpg', fallbackId: 1027, alt: 'Urban Stories — look 3', caption: 'Look 03' },
      { url: '/images/urban-4.jpg', fallbackId: 338, alt: 'Urban Stories — look 4', caption: 'Look 04' },
      { url: '/images/urban-5.jpg', fallbackId: 823, alt: 'Urban Stories — look 5', caption: 'Look 05' },
      { url: '/images/urban-6.jpg', fallbackId: 660, alt: 'Urban Stories — look 6', caption: 'Look 06' },
    ],
  },
  {
    title: 'Interiors & Luxury Spaces',
    description: 'Curated settings in refined environments—galleries, hotels, and hidden cafés.',
    layout: 'grid',
    images: [
      { url: 'https://picsum.photos/seed/interior-1/600/800', alt: 'Interiors and Luxury Spaces 1', caption: 'Gallery Light' },
      { url: 'https://picsum.photos/seed/interior-2/600/800', alt: 'Interiors and Luxury Spaces 2', caption: 'Quiet Luxury' },
      { url: 'https://picsum.photos/seed/interior-3/600/800', alt: 'Interiors and Luxury Spaces 3', caption: 'Hotel Story' },
      { url: 'https://picsum.photos/seed/interior-4/600/800', alt: 'Interiors and Luxury Spaces 4', caption: 'Private Salon' },
    ],
  },
  {
    title: 'Studio & Monochrome',
    description: 'Timeless minimalism. Classic studio work with focus on silhouette, form, and light.',
    layout: 'editorial',
    images: [
      { url: 'https://picsum.photos/seed/studio-1/600/800', alt: 'Studio and Monochrome 1', caption: 'Form Study' },
      { url: 'https://picsum.photos/seed/studio-2/600/800', alt: 'Studio and Monochrome 2', caption: 'Soft Contrast' },
      { url: 'https://picsum.photos/seed/studio-3/600/800', alt: 'Studio and Monochrome 3', caption: 'Beauty Closeup' },
      { url: 'https://picsum.photos/seed/studio-4/900/600', alt: 'Studio and Monochrome 4', caption: 'Timeless Frame' },
    ],
  },
  {
    title: 'Color Statements',
    description: 'Bold palettes, vivid scenes, and dynamic compositions that command attention.',
    layout: 'grid',
    images: [
      { url: 'https://picsum.photos/seed/color-1/600/800', alt: 'Color Statements 1', caption: 'Vivid Mood' },
      { url: 'https://picsum.photos/seed/color-2/600/800', alt: 'Color Statements 2', caption: 'Color Field' },
      { url: 'https://picsum.photos/seed/color-3/600/800', alt: 'Color Statements 3', caption: 'Dynamic Palette' },
      { url: 'https://picsum.photos/seed/color-4/600/800', alt: 'Color Statements 4', caption: 'Statement' },
    ],
  },
];

const PortfolioSection = ({ chapters }) => {
  const sectionRef = useRef(null);
  const urbanRef = useRef(null);
  const trackRef = useRef(null);
  const chaptersData = chapters || defaultChapters;
  const [urbanChapter, ...otherChapters] = chaptersData;

  useEffect(() => {
    const track = trackRef.current;
    const urban = urbanRef.current;

    if (!track || !urban || window.matchMedia('(max-width: 768px)').matches) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const getScrollDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const getScrollAmount = () => -getScrollDistance();

      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: urban,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          invalidateOnRefresh: true,
        },
      });

      const refreshScroll = () => ScrollTrigger.refresh();
      window.addEventListener('load', refreshScroll, { once: true });
      track.querySelectorAll('img').forEach((image) => {
        if (image.complete) {
          refreshScroll();
        } else {
          image.addEventListener('load', refreshScroll, { once: true });
          image.addEventListener('error', refreshScroll, { once: true });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="portfolio-section" id="portfolio">
      <div className="container">
        <div className="portfolio-intro">
          <span className="section-kicker">Selected Work</span>
          <h2 className="section-title">Portfolio</h2>
          <p className="section-subtitle">A curated selection of editorial and commercial work</p>
        </div>
      </div>

      <article ref={urbanRef} className="chapter chapter-urban">
        <header className="chapter-urban-header">
          <span className="chapter-number">01 —</span>
          <div>
            <h3 className="chapter-title">{urbanChapter.title}</h3>
            <p className="chapter-description">{urbanChapter.description}</p>
          </div>
        </header>
        <div ref={trackRef} className="chapter-track">
          {urbanChapter.images.map((image, index) => (
            <figure key={image.alt} className="track-item chapter-track-item">
              <img
                src={image.url}
                alt={image.alt || `Urban Stories — look ${index + 1}`}
                width="400"
                height="560"
                loading="lazy"
                onLoad={() => ScrollTrigger.refresh()}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = `https://picsum.photos/id/${image.fallbackId}/400/560`;
                  ScrollTrigger.refresh();
                }}
              />
              <figcaption>{image.caption || `Look ${String(index + 1).padStart(2, '0')}`}</figcaption>
            </figure>
          ))}
        </div>
      </article>

      <div className="container">
        {otherChapters.map((chapter, index) => (
          <Chapter
            key={chapter.title}
            number={index + 2}
            title={chapter.title}
            description={chapter.description}
            images={chapter.images}
            layout={chapter.layout}
          />
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;
