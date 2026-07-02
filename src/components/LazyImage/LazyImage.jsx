import React, { useEffect, useRef, useState } from 'react';
import './LazyImage.css';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&h=1200&fit=crop&auto=format&q=82';

const LazyImage = ({ src, alt, className = '', imageClassName = '', eager = false }) => {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const imageRef = useRef(null);

  useEffect(() => {
    setCurrentSrc(src);
    setLoaded(false);
  }, [src]);

  useEffect(() => {
    if (imageRef.current?.complete) {
      setLoaded(true);
    }
  }, [currentSrc]);

  return (
    <div className={`lazy-image-wrapper ${className} ${loaded ? 'is-loaded' : ''}`}>
      <img
        ref={imageRef}
        src={currentSrc}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (currentSrc !== FALLBACK_IMAGE) {
            setCurrentSrc(FALLBACK_IMAGE);
          }
          setLoaded(true);
        }}
        className={imageClassName}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  );
};

export default LazyImage;
