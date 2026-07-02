import React from 'react';
import { motion } from 'framer-motion';
import './ServicesSection.css';

const defaultServices = [
  {
    title: 'High-End Fashion Campaigns',
    description: 'Runway to ready-to-wear for luxury brands seeking sophisticated visual impact.',
  },
  {
    title: 'Editorial & Magazine',
    description: 'Vogue, Harper\'s Bazaar, and independent publications with a strong editorial vision.',
  },
  {
    title: 'Beauty & Cosmetics',
    description: 'Skincare, fragrance, and makeup campaigns demanding refined aesthetic presence.',
  },
  {
    title: 'Lookbooks & Catalogues',
    description: 'Seasonal collections and designer showcases requiring consistency and versatility.',
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
          <p className="section-subtitle">Available for premium regional and worldwide bookings</p>
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
