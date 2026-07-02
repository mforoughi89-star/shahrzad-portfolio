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
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.1,
            ease: 'power3.inOut',
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
