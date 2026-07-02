import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useImageReveal(scopeRef) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.img-reveal').forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
            clearProps: 'transform,opacity,visibility',
            scrollTrigger: {
              trigger: element,
              start: 'top 86%',
              once: true,
            },
          },
        );
      });
    }, scopeRef);

    return () => ctx.revert();
  }, [scopeRef]);
}
