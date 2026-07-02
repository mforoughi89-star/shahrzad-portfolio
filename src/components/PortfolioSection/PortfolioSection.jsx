import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Chapter from './Chapter.jsx';
import './PortfolioSection.css';

gsap.registerPlugin(ScrollTrigger);

const realImage = (filename) => `/images/optimized/${filename}`;

const realImageFallbacks = [
  realImage('urban-05.jpg'),
  realImage('urban-02.jpg'),
  realImage('interiors-01.jpg'),
];

const defaultChapters = [
  {
    title: 'Urban Stories',
    description: 'Contemporary fashion meets architectural landscapes and metropolitan energy.',
    layout: 'horizontal',
    images: [
      { url: realImage('urban-01.jpg'), alt: 'Shahrzad urban fashion look 1', caption: 'Look 01' },
      { url: realImage('urban-02.jpg'), alt: 'Shahrzad urban fashion look 2', caption: 'Look 02' },
      { url: realImage('urban-03.jpg'), alt: 'Shahrzad urban fashion look 3', caption: 'Look 03' },
      { url: realImage('urban-04.jpg'), alt: 'Shahrzad urban fashion look 4', caption: 'Look 04' },
      { url: realImage('urban-05.jpg'), alt: 'Shahrzad urban fashion look 5', caption: 'Look 05' },
      { url: realImage('urban-06.jpg'), alt: 'Shahrzad urban fashion look 6', caption: 'Look 06' },
    ],
  },
  {
    title: 'Interiors & Luxury Spaces',
    description: 'Curated settings in refined environments—galleries, hotels, and hidden cafés.',
    layout: 'grid',
    images: [
      { url: realImage('interiors-01.jpg'), alt: 'Shahrzad interior editorial portrait 1', caption: 'Gallery Light' },
      { url: realImage('interiors-02.jpg'), alt: 'Shahrzad interior editorial portrait 2', caption: 'Quiet Luxury' },
      { url: realImage('interiors-03.jpg'), alt: 'Shahrzad interior editorial portrait 3', caption: 'Hotel Story' },
      { url: realImage('interiors-04.jpg'), alt: 'Shahrzad luxury space editorial portrait', caption: 'Private Salon' },
    ],
  },
  {
    title: 'Studio & Monochrome',
    description: 'Timeless minimalism. Classic studio work with focus on silhouette, form, and light.',
    layout: 'editorial',
    images: [
      { url: realImage('studio-01.jpg'), alt: 'Shahrzad studio portrait 1', caption: 'Form Study' },
      { url: realImage('studio-02.jpg'), alt: 'Shahrzad studio portrait 2', caption: 'Soft Contrast' },
      { url: realImage('studio-03.jpg'), alt: 'Shahrzad monochrome portrait', caption: 'Beauty Closeup' },
      { url: realImage('studio-landscape.jpg'), alt: 'Shahrzad studio landscape frame', caption: 'Timeless Frame' },
    ],
  },
  {
    title: 'Color Statements',
    description: 'Bold palettes, vivid scenes, and dynamic compositions that command attention.',
    layout: 'grid',
    images: [
      { url: realImage('color-01.jpg'), alt: 'Shahrzad colorful outfit 1', caption: 'Vivid Mood' },
      { url: realImage('color-02.jpg'), alt: 'Shahrzad colorful outfit 2', caption: 'Color Field' },
      { url: realImage('color-03.jpg'), alt: 'Shahrzad colorful outfit 3', caption: 'Dynamic Palette' },
      { url: realImage('color-04.jpg'), alt: 'Shahrzad bold color statement', caption: 'Statement' },
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

    if (nextFallbackIndex >= realImageFallbacks.length) {
      image.onerror = null;
      image.style.background = '#0B0D10';
      image.style.minHeight = '600px';
      return;
    }

    image.dataset.fallbackIndex = String(nextFallbackIndex + 1);
    image.src = realImageFallbacks[(index + nextFallbackIndex) % realImageFallbacks.length];
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
