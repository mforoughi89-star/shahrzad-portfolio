import React, { Suspense, lazy, useCallback, useState } from 'react';
import Header from './components/Header/Header.jsx';
import HeroSection from './components/HeroSection/HeroSection.jsx';
import PortfolioSection from './components/PortfolioSection/PortfolioSection.jsx';
import AboutSection from './components/AboutSection/AboutSection.jsx';
import ServicesSection from './components/ServicesSection/ServicesSection.jsx';
import ScrollProgress from './components/ScrollProgress/ScrollProgress.jsx';
import CustomCursor from './components/CustomCursor/CustomCursor.jsx';
import Preloader from './components/Preloader/Preloader.jsx';
import PresenceSection from './components/PresenceSection/PresenceSection.jsx';

const BookingSection = lazy(() => import('./components/BookingSection/BookingSection.jsx'));
const FooterSection = lazy(() => import('./components/FooterSection/FooterSection.jsx'));

const heroData = {
  name: 'Shahrzad',
  subtitle: 'Fashion & Commercial Model',
  tagline: 'Elevating stories for luxury fashion, beauty and lifestyle brands through poised movement, refined presence, and cinematic visual language.',
  heroImage: 'https://picsum.photos/seed/shahrzad-hero/1200/1600',
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const handlePreloaderComplete = useCallback(() => setLoading(false), []);

  return (
    <>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <div className={`app${loading ? ' is-loading' : ''}`}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <ScrollProgress />
        <CustomCursor />
        <Header />
        <main id="main-content" className={loading ? 'is-loading' : ''}>
          <HeroSection data={heroData} loading={loading} />
          <PortfolioSection />
          <AboutSection />
          <ServicesSection />
          <PresenceSection />
          <Suspense fallback={<div className="section-loader" aria-label="Loading section" />}>
            <BookingSection />
            <FooterSection />
          </Suspense>
        </main>
      </div>
    </>
  );
};

export default App;
