import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Dark-romanticism reveal, gated on real image load.
 * Fires the 1.6s wipe + 2.2s scale settle only when the
 * element is in view AND its <img> has actually decoded.
 */
export const useImageReveal = (containerRef) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray('.img-reveal');

      targets.forEach((el) => {
        const img = el.querySelector('img');

        // Hide immediately so nothing flashes before it's ready
        gsap.set(el, {
          clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
        });
        if (img) gsap.set(img, { scale: 1.08 });

        let inView = false;
        let imgReady = !img || (img.complete && img.naturalWidth > 0);
        let played = false;

        const play = () => {
          if (played || !inView || !imgReady) return;
          played = true;

          const tl = gsap.timeline();
          tl.to(el, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            ease: 'expo.out',
            duration: 1.6,
          });
          if (img) {
            tl.to(
              img,
              {
                scale: 1,
                ease: 'power3.out',
                duration: 2.2,
                clearProps: 'scale',
              },
              0,
            );
          }
        };

        const onImgReady = () => {
          imgReady = true;
          play();
        };

        if (img && !imgReady) {
          img.addEventListener('load', onImgReady, { once: true });
          img.addEventListener('error', onImgReady, { once: true });
        }

        ScrollTrigger.create({
          trigger: el,
          start: 'top 82%',
          once: true,
          onEnter: () => {
            inView = true;
            play();
          },
        });
      });

      // Late-loading images shift layout — keep triggers honest
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
};
