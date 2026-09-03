import React from 'react';
import { motion } from 'framer-motion';
import './ServicesSection.css';

const defaultServices = [
  {
    title: 'Commercial & Brand Shoots',
    description: 'Engaging, expressive visuals for fashion brands, boutique apparel, and social campaigns.',
  },
  {
    title: 'Lookbooks & E-Commerce',
    description: 'Clean, versatile product and collection showcases for digital stores and seasonal releases.',
  },
  {
    title: 'Beauty & Cosmetics',
    description: 'Closeups and natural aesthetic presentation for skincare, makeup, and wellness brands.',
  },
  {
    title: 'Creative & Editorial Studio',
    description: 'Artistic collaborations with photographers, stylists, and independent designers.',
  },
];

const ServicesSection = ({ services }) => {
  const servicesData = services || defaultServices;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="services-intro">
          <span className="section-kicker">Capabilities</span>
          <h2 className="section-title">Services</h2>
          <p className="section-subtitle">Available for commercial shoots, lookbooks, and creative collaborations</p>
        </div>

        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {servicesData.map((service, index) => (
            <motion.article
              key={service.title}
              className="service-card"
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
