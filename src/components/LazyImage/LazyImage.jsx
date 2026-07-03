import React, { useEffect, useRef, useState } from 'react';
import './LazyImage.css';

const FALLBACK_IMAGE = '/images/optimized/urban-05.jpg';

const LazyImage = ({
  src,
  alt,
  className = '',
  imageClassName = '',
  eager = false,
  onReady,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const imageRef = useRef(null);

  useEffect(() => {
    setCurrentSrc(src);
    setLoaded(false);
  }, [src]);

  // Catch browser-cached images that never fire onLoad
  useEffect(() => {
    if (imageRef.current?.complete && imageRef.current?.naturalWidth > 0) {
      setLoaded(true);
      onReady?.(imageRef.current);
    }
  }, [currentSrc, onReady]);

  const handleLoad = () => {
    setLoaded(true);
    onReady?.(imageRef.current);
  };

  return (
    <div className={`lazy-image-wrapper ${className} ${loaded ? 'is-loaded' : ''}`}>
      <img
        ref={imageRef}
        src={currentSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={() => {
          if (currentSrc !== FALLBACK_IMAGE) {
            setCurrentSrc(FALLBACK_IMAGE);
          } else {
            setLoaded(true);
            onReady?.(imageRef.current);
          }
        }}
        className={imageClassName}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  );
};

export default LazyImage;
