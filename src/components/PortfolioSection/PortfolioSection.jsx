import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Chapter from './Chapter.jsx';
import './PortfolioSection.css';

gsap.registerPlugin(ScrollTrigger);

const urbanFallbackIds = [
  '1515886657613-9d3515b2ce84',
  '1539109136881-3be0616acf4b',
  '1483985988355-763728e1935b',
  '1490481651871-ab68de25d43d',
];

const getUnsplashImage = (id, width = 900, height = 1200) => (
  `https://images.unsplash.com/photo-${id}?w=${width}&h=${height}&fit=crop&auto=format&q=84`
);

const defaultChapters = [
  {
    title: 'Urban Stories',
    description: 'Contemporary fashion meets architectural landscapes and metropolitan energy.',
    layout: 'horizontal',
    images: [
      { url: getUnsplashImage('1515886657613-9d3515b2ce84'), alt: 'Urban Stories — look 1', caption: 'Look 01' },
      { url: getUnsplashImage('1539109136881-3be0616acf4b'), alt: 'Urban Stories — look 2', caption: 'Look 02' },
      { url: getUnsplashImage('1483985988355-763728e1935b'), alt: 'Urban Stories — look 3', caption: 'Look 03' },
      { url: getUnsplashImage('1490481651871-ab68de25d43d'), alt: 'Urban Stories — look 4', caption: 'Look 04' },
      { url: getUnsplashImage('1509631179647-0177331693ae'), alt: 'Urban Stories — look 5', caption: 'Look 05' },
      { url: getUnsplashImage('1496747611176-843222e1e57c'), alt: 'Urban Stories — look 6', caption: 'Look 06' },
    ],
  },
  {
    title: 'Interiors & Luxury Spaces',
    description: 'Curated settings in refined environments—galleries, hotels, and hidden cafés.',
    layout: 'grid',
    images: [
      { url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&h=1200&fit=crop&auto=format&q=82', alt: 'Interiors and Luxury Spaces 1', caption: 'Gallery Light' },
      { url: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=900&h=1200&fit=crop&auto=format&q=82', alt: 'Interiors and Luxury Spaces 2', caption: 'Quiet Luxury' },
      { url: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=900&h=1200&fit=crop&auto=format&q=82', alt: 'Interiors and Luxury Spaces 3', caption: 'Hotel Story' },
      { url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&h=1200&fit=crop&auto=format&q=82', alt: 'Interiors and Luxury Spaces 4', caption: 'Private Salon' },
    ],
  },
  {
    title: 'Studio & Monochrome',
    description: 'Timeless minimalism. Classic studio work with focus on silhouette, form, and light.',
    layout: 'editorial',
    images: [
      { url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&h=1200&fit=crop&auto=format&q=82', alt: 'Studio and Monochrome 1', caption: 'Form Study' },
      { url: 'https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?w=1200&h=800&fit=crop&auto=format&q=82', alt: 'Studio and Monochrome 2', caption: 'Soft Contrast' },
      { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&h=800&fit=crop&auto=format&q=82', alt: 'Studio and Monochrome 3', caption: 'Beauty Closeup' },
      { url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&h=800&fit=crop&auto=format&q=82', alt: 'Studio and Monochrome 4', caption: 'Timeless Frame' },
    ],
  },
  {
    title: 'Color Statements',
    description: 'Bold palettes, vivid scenes, and dynamic compositions that command attention.',
    layout: 'grid',
    images: [
      { url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&h=1200&fit=crop&auto=format&q=82', alt: 'Color Statements 1', caption: 'Vivid Mood' },
      { url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&h=1200&fit=crop&auto=format&q=82', alt: 'Color Statements 2', caption: 'Color Field' },
      { url: 'https://images.unsplash.com/photo-1495385794356-15371f348c31?w=900&h=1200&fit=crop&auto=format&q=82', alt: 'Color Statements 3', caption: 'Dynamic Palette' },
      { url: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=900&h=1200&fit=crop&auto=format&q=82', alt: 'Color Statements 4', caption: 'Statement' },
    ],
  },
];

const PortfolioSection = ({ chapters }) => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const chaptersData = chapters || defaultChapters;
  const [urbanChapter, ...otherChapters] = chaptersData;

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const track = trackRef.current;

    if (!sectionEl || !track) {
      return undefined;
    }

    const getScrollDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);
    const refreshOnLoad = () => ScrollTrigger.refresh();

    window.addEventListener('load', refreshOnLoad);

    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add('(min-width: 769px)', () => {
        const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

        if (isTouch) {
          gsap.set(track, { clearProps: 'transform' });
          ScrollTrigger.refresh();
          return undefined;
        }

        const animation = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionEl,
            pin: true,
            scrub: 1,
            end: () => `+=${getScrollDistance()}`,
            invalidateOnRefresh: true,
          },
        });

        refreshOnLoad();

        return () => {
          animation.scrollTrigger?.kill();
          animation.kill();
        };
      });

      media.add('(max-width: 768px)', () => {
        gsap.set(track, { clearProps: 'transform' });
        ScrollTrigger.refresh();
      });

      return () => media.revert();
    }, sectionRef);

    refreshOnLoad();

    return () => {
      window.removeEventListener('load', refreshOnLoad);
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [urbanChapter.images.length]);

  const handleUrbanImageError = (event, index) => {
    const image = event.currentTarget;
    const nextFallbackIndex = Number(image.dataset.fallbackIndex || 0);

    if (nextFallbackIndex >= urbanFallbackIds.length) {
      image.onerror = null;
      return;
    }

    image.dataset.fallbackIndex = String(nextFallbackIndex + 1);
    image.src = getUnsplashImage(urbanFallbackIds[(index + nextFallbackIndex) % urbanFallbackIds.length]);
  };

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="container">
        <div className="portfolio-intro">
          <span className="section-kicker">Selected Work</span>
          <h2 className="section-title">Portfolio</h2>
          <p className="section-subtitle">A curated selection of editorial and commercial work</p>
        </div>
      </div>

      <article ref={sectionRef} className="chapter chapter-urban chapter--horizontal">
        <header className="chapter-urban-header">
          <span className="chapter-number">01 —</span>
          <div>
            <h3 className="chapter-title">{urbanChapter.title}</h3>
            <p className="chapter-description">{urbanChapter.description}</p>
          </div>
        </header>
        <div ref={trackRef} className="chapter-track" aria-label="Urban Stories gallery">
          {urbanChapter.images.map((image, index) => (
            <figure key={image.alt} className="track-item chapter-track-item">
              <img
                src={image.url}
                alt={image.alt || `Urban Stories — look ${index + 1}`}
                width="900"
                height="1200"
                loading={index < 2 ? 'eager' : 'lazy'}
                decoding="async"
                onLoad={() => ScrollTrigger.refresh()}
                onError={(event) => handleUrbanImageError(event, index)}
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
