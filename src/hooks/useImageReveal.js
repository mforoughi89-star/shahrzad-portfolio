import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create('cinematicReveal', '0.33, 1, 0.68, 1');

export function useImageReveal(scopeRef) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.img-reveal').forEach((element) => {
        gsap.fromTo(
          element,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.15,
            ease: 'cinematicReveal',
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
