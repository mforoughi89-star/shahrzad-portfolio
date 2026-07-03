import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Dark-romanticism image reveal.
 * Clip-path wipe + slow scale settle, per-image trigger.
 * Ease: expo.out @ 1.6s — heavy, deliberate, editorial.
 */
export const useImageReveal = (containerRef) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray('.img-reveal');

      targets.forEach((el) => {
        const img = el.querySelector('img') || el;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            toggleActions: 'play none none none',
            once: true,
          },
        });

        tl.fromTo(
          el,
          { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            ease: 'expo.out',
            duration: 1.6,
          },
          0,
        ).fromTo(
          img,
          { scale: 1.08 },
          {
            scale: 1,
            ease: 'power3.out',
            duration: 2.2,
            clearProps: 'scale',
          },
          0,
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
};
