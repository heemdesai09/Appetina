'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function Booking() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventDate: '',
    guests: '',
    eventType: '',
    message: '',
  });

  const eventTypes = [
    'Wedding',
    'Reception',
    'Birthday Party',
    'Anniversary',
    'Corporate Event',
    'Conference',
    'Product Launch',
    'Family Gathering',
    'Other',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          guests: parseInt(formData.guests),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Booking request submitted successfully! We will contact you soon.');
        setFormData({
          name: '',
          phone: '',
          email: '',
          eventDate: '',
          guests: '',
          eventType: '',
          message: '',
        });
      } else {
        toast.error(data.error || 'Failed to submit booking');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get min date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="booking" className="section-container bg-white">
      <div ref={ref} className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block px-4 py-1.5 bg-maroon-100 text-maroon-700 rounded-full text-sm font-sans font-semibold mb-4"
          >
            BOOK YOUR EVENT
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold heading-gradient mb-6"
          >
            Reserve Your Special Day
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto font-body"
          >
            Fill out the form below and our team will get back to you within 24 hours
          </motion.p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-gray-50 to-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="label-text">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="phone" className="label-text">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="input-field"
                placeholder="9876543210"
                pattern="[6-9][0-9]{9}"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="label-text">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              placeholder="john@example.com"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="eventDate" className="label-text">
                Event Date *
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                required
                value={formData.eventDate}
                onChange={handleChange}
                min={today}
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="guests" className="label-text">
                Number of Guests *
              </label>
              <input
                type="number"
                id="guests"
                name="guests"
                required
                value={formData.guests}
                onChange={handleChange}
                min="10"
                max="1000"
                className="input-field"
                placeholder="100"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="eventType" className="label-text">
              Event Type *
            </label>
            <select
              id="eventType"
              name="eventType"
              required
              value={formData.eventType}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select Event Type</option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-8">
            <label htmlFor="message" className="label-text">
              Additional Message (Optional)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="input-field resize-none"
              placeholder="Any special requirements or preferences..."
              maxLength={500}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-maroon-800 to-maroon-700 text-white py-4 rounded-lg font-sans font-bold text-lg hover:from-maroon-900 hover:to-maroon-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Booking Request'
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
