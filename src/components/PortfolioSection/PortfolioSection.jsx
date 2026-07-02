import React from 'react';
import Chapter from './Chapter.jsx';
import './PortfolioSection.css';

const defaultChapters = [
  {
    title: 'Urban Stories',
    description: 'Contemporary fashion meets architectural landscapes and metropolitan energy.',
    layout: 'horizontal',
    images: [
      { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1120&fit=crop&auto=format&q=82', alt: 'Urban Stories — look 1', caption: 'Look 01' },
      { url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&h=1120&fit=crop&auto=format&q=82', alt: 'Urban Stories — look 2', caption: 'Look 02' },
      { url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=1120&fit=crop&auto=format&q=82', alt: 'Urban Stories — look 3', caption: 'Look 03' },
      { url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=1120&fit=crop&auto=format&q=82', alt: 'Urban Stories — look 4', caption: 'Look 04' },
      { url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1120&fit=crop&auto=format&q=82', alt: 'Urban Stories — look 5', caption: 'Look 05' },
      { url: 'https://images.unsplash.com/photo-1513379733131-47fc74b45fc7?w=800&h=1120&fit=crop&auto=format&q=82', alt: 'Urban Stories — look 6', caption: 'Look 06' },
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
  const chaptersData = chapters || defaultChapters;
  const [urbanChapter, ...otherChapters] = chaptersData;

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="container">
        <div className="portfolio-intro">
          <span className="section-kicker">Selected Work</span>
          <h2 className="section-title">Portfolio</h2>
          <p className="section-subtitle">A curated selection of editorial and commercial work</p>
        </div>
      </div>

      <article className="chapter chapter-urban">
        <header className="chapter-urban-header">
          <span className="chapter-number">01 —</span>
          <div>
            <h3 className="chapter-title">{urbanChapter.title}</h3>
            <p className="chapter-description">{urbanChapter.description}</p>
          </div>
        </header>
        <div className="chapter-track" aria-label="Urban Stories gallery">
          {urbanChapter.images.map((image, index) => (
            <figure key={image.alt} className="track-item chapter-track-item">
              <img
                src={image.url}
                alt={image.alt || `Urban Stories — look ${index + 1}`}
                width="400"
                height="560"
                loading={index < 2 ? 'eager' : 'lazy'}
                decoding="async"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1120&fit=crop&auto=format&q=82';
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
