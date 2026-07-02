import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    if (!cursor || !finePointer) {
      return undefined;
    }

    const moveCursor = (event) => {
      gsap.to(cursor, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.28,
        ease: 'power3.out',
      });
    };

    const addActiveState = () => cursor.classList.add('is-active');
    const removeActiveState = () => cursor.classList.remove('is-active');

    window.addEventListener('mousemove', moveCursor);
    document.querySelectorAll('a, button, input, select, textarea, .chapter-image-wrapper').forEach((element) => {
      element.addEventListener('mouseenter', addActiveState);
      element.addEventListener('mouseleave', removeActiveState);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.querySelectorAll('a, button, input, select, textarea, .chapter-image-wrapper').forEach((element) => {
        element.removeEventListener('mouseenter', addActiveState);
        element.removeEventListener('mouseleave', removeActiveState);
      });
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
};

export default CustomCursor;
