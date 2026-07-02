import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PresenceSection.css';

gsap.registerPlugin(ScrollTrigger);

const CITIES = [
  { name: 'Tehran', zone: 'Asia/Tehran', gmt: 'GMT+3:30' },
  { name: 'Dubai', zone: 'Asia/Dubai', gmt: 'GMT+4' },
  { name: 'Istanbul', zone: 'Europe/Istanbul', gmt: 'GMT+3' },
];

function getTime(zone) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: zone,
  }).format(new Date());
}

export default function PresenceSection() {
  const rootRef = useRef(null);
  const [now, setNow] = useState(() => CITIES.map((city) => getTime(city.zone)));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(CITIES.map((city) => getTime(city.zone)));
    }, 30000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.presence-city',
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 75%',
            once: true,
          },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="presence" ref={rootRef} id="presence">
      <span className="presence-eyebrow">International Presence</span>
      <h2 className="presence-title">Three Cities. One Signature.</h2>
      <span className="presence-line" />
      <div className="presence-grid">
        {CITIES.map((city, index) => (
          <div className="presence-city" key={city.name}>
            <time className="presence-time" dateTime={now[index]}>{now[index]}</time>
            <h3 className="presence-name">{city.name}</h3>
            <span className="presence-gmt">{city.gmt}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
