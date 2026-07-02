import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import LazyImage from '../LazyImage/LazyImage.jsx';
import { useImageReveal } from '../../hooks/useImageReveal.js';
import './HeroSection.css';

const HeroSection = ({ data, loading = false }) => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const maskRef = useRef(null);

  useImageReveal(heroRef);

  useEffect(() => {
    if (loading) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.set(heroRef.current, { autoAlpha: 1 });

      gsap.fromTo(
        textRef.current.children,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.95,
          delay: 0.3,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'all',
        },
      );

      gsap.to(maskRef.current, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.15,
        delay: 0.3,
        ease: 'power4.inOut',
      });
    }, heroRef);

    return () => ctx.revert();
  }, [loading]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    gsap.to(event.currentTarget, {
      x: x * 0.1,
      y: y * 0.1,
      duration: 0.3,
      ease: 'power3.out',
    });
  };

  const handleMouseLeave = (event) => {
    gsap.to(event.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.35)',
    });
  };

  return (
    <section ref={heroRef} className="hero-section" id="hero">
      <div className="hero-ornament" aria-hidden="true">01</div>
      <div className="container hero-container">
        <div ref={textRef} className="hero-text">
          <span className="hero-kicker">Luxury Model Portfolio</span>
          <h1 className="hero-name">{data?.name || 'Shahrzad'}</h1>
          <p className="hero-subtitle">{data?.subtitle || 'Fashion & Commercial Model'}</p>
          <p className="hero-tagline">
            {data?.tagline || 'Elevating stories for luxury fashion, beauty and lifestyle brands.'}
          </p>
          <div className="hero-cta">
            <button
              className="luxury-button primary magnetic-button"
              onClick={() => scrollToSection('portfolio')}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              View Portfolio
            </button>
            <button
              className="luxury-button secondary magnetic-button"
              onClick={() => scrollToSection('booking')}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              Booking & Inquiries
            </button>
          </div>
        </div>

        <div className="hero-image-wrapper hero-visual img-reveal">
          <div ref={maskRef} className="hero-image-mask" />
          <video
            className="hero-video"
            autoPlay
            loop
            muted
            playsInline
            poster={data?.heroImage}
            aria-label="Shahrzad fashion reel"
          >
            <source src="/videos/hero-reel.mp4" type="video/mp4" />
            <source src="/videos/hero-reel.webm" type="video/webm" />
          </video>
          <LazyImage
            src={data?.heroImage}
            alt="Shahrzad"
            className="hero-lazy-image hero-video-fallback"
            imageClassName="hero-image"
            eager
          />
          <div className="hero-image-caption">Editorial / Campaign / Beauty</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
