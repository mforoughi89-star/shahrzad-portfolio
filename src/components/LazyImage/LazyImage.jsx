import React, { useEffect, useRef, useState } from 'react';
import './LazyImage.css';

const LazyImage = ({ src, alt, className = '', imageClassName = '', eager = false }) => {
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current?.complete) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <div className={`lazy-image-wrapper ${className} ${loaded ? 'is-loaded' : ''}`}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={imageClassName}
        loading={eager ? 'eager' : 'lazy'}
      />
    </div>
  );
};

export default LazyImage;
