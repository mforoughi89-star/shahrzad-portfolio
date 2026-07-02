import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Preloader.css';

const BRAND = 'SHAHRZAD';

export default function Preloader({ onComplete }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => onComplete?.(),
      });

      tl.fromTo(
        '.preloader-letter',
        { yPercent: 100, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.8, stagger: 0.06 },
      )
        .fromTo(
          '.preloader-line',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: 'power2.inOut' },
          '-=0.3',
        )
        .to({}, { duration: 0.5 })
        .to(rootRef.current, {
          yPercent: -100,
          duration: 1,
          ease: 'power4.inOut',
        });
    }, rootRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div className="preloader" ref={rootRef} aria-hidden="true">
      <div className="preloader-inner">
        <h1 className="preloader-brand" aria-label="Shahrzad">
          {BRAND.split('').map((letter, index) => (
            <span className="preloader-letter-mask" key={`${letter}-${index}`}>
              <span className="preloader-letter">{letter}</span>
            </span>
          ))}
        </h1>
        <span className="preloader-line" />
      </div>
    </div>
  );
}
