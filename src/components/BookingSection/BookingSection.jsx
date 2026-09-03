import React, { useState } from 'react';
import './BookingSection.css';
import { sendBookingInquiryToTelegram } from '../../services/telegramService';

const emptyForm = {
  name: '',
  brandAgency: '',
  email: '',
  projectType: '',
  location: '',
  proposedDates: '',
  budgetRange: '',
  message: '',
};

const BookingSection = ({ onSubmit }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        await sendBookingInquiryToTelegram(formData);
      }

      setSubmitStatus('success');
      setFormData(emptyForm);
      setTimeout(() => setSubmitStatus(null), 7000);
    } catch (error) {
      setSubmitStatus('error');
      console.error('Booking submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="booking-section" id="booking">
      <div className="container booking-container">
        <div className="booking-copy">
          <span className="section-kicker">Bookings</span>
          <h2 className="section-title">Create the next visual story</h2>
          <p>
            For lookbooks, commercial campaigns, beauty shoots, and creative brand collaborations,
            share your project details and I will respond with availability.
          </p>
          <div className="booking-contact-card">
            <span>Direct contact</span>
            <a href="mailto:booking@shahrzad.ir">booking@shahrzad.ir</a>
          </div>
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Name
              <input name="name" value={formData.name} onChange={handleChange} required placeholder="Your full name" />
            </label>
            <label>
              Brand / Agency
              <input name="brandAgency" value={formData.brandAgency} onChange={handleChange} placeholder="Company or agency" />
            </label>
          </div>

          <div className="form-row">
            <label>
              Email
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="name@company.com" />
            </label>
            <label>
              Project Type
              <select name="projectType" value={formData.projectType} onChange={handleChange} required>
                <option value="">Select one</option>
                <option value="Commercial Shoot">Commercial Shoot</option>
                <option value="Lookbook & E-Commerce">Lookbook & E-Commerce</option>
                <option value="Beauty / Cosmetics">Beauty / Cosmetics</option>
                <option value="Brand Campaign">Brand Campaign</option>
                <option value="Studio & Creative Project">Studio & Creative Project</option>
              </select>
            </label>
          </div>

          <div className="form-row">
            <label>
              Location
              <input name="location" value={formData.location} onChange={handleChange} placeholder="City / country" />
            </label>
            <label>
              Proposed Dates
              <input name="proposedDates" value={formData.proposedDates} onChange={handleChange} placeholder="Preferred shoot dates" />
            </label>
          </div>

          <label>
            Budget Range
            <input name="budgetRange" value={formData.budgetRange} onChange={handleChange} placeholder="Estimated production budget" />
          </label>

          <label>
            Message
            <textarea name="message" value={formData.message} onChange={handleChange} rows="6" required placeholder="Tell us about the concept, usage, team, and deliverables." />
          </label>

          <button
            className="luxury-button primary booking-submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending Inquiry...' : 'Send Inquiry'}
          </button>

          {submitStatus === 'success' && (
            <p className="form-status success">
              ✨ Thank you! Your inquiry has been sent directly to Shahrzad. We will review and respond shortly.
            </p>
          )}
          {submitStatus === 'error' && (
            <p className="form-status error">
              Unable to send inquiry automatically. Please contact directly via WhatsApp or email below.
            </p>
          )}
        </form>

        <div className="booking-alternative">
          <p className="alternative-text">Prefer direct contact?</p>
          <a
            href="https://wa.me/Shahrzd"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-link"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
