'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-container bg-gradient-to-b from-white to-gray-50">
      <div ref={ref} className="grid md:grid-cols-2 gap-12 items-center">
        {/* Image Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80"
              alt="Appetina Restaurant Interior"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/50 to-transparent" />
          </div>
          {/* Decorative Element */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold-500 rounded-full opacity-20 blur-3xl" />
          <div className="absolute -top-6 -left-6 w-40 h-40 bg-maroon-500 rounded-full opacity-20 blur-3xl" />
        </motion.div>

        {/* Content Side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-1.5 bg-maroon-100 text-maroon-700 rounded-full text-sm font-sans font-semibold mb-4">
            ABOUT US
          </span>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold heading-gradient mb-6">
            Where Every Occasion Becomes Extraordinary
          </h2>
          
          <div className="space-y-4 text-gray-700 font-body text-lg leading-relaxed">
            <p>
              Welcome to <span className="font-semibold text-maroon-700">Appetina</span>, 
              Ahmedabad's premier destination for unforgettable celebrations and exquisite dining 
              experiences. Nestled in the heart of Amraiwadi, we've been creating magical moments 
              for families and businesses since our inception.
            </p>
            
            <p>
              Our state-of-the-art banquet hall, capable of hosting up to <span className="font-semibold text-maroon-700">500 guests</span>, 
              features elegant décor, modern amenities, and impeccable service. Whether you're planning 
              a grand wedding, corporate event, or intimate celebration, our experienced team ensures 
              every detail is perfect.
            </p>
            
            <p>
              Complementing our event space is our multi-cuisine restaurant, where our master chefs 
              craft authentic North Indian, Chinese, and South Indian delicacies using the finest 
              ingredients. Every dish is a celebration of flavors, prepared with passion and served 
              with warmth.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="text-3xl font-display font-bold text-maroon-700 mb-2">500+</div>
              <div className="text-gray-600 font-sans">Banquet Capacity</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="text-3xl font-display font-bold text-maroon-700 mb-2">150+</div>
              <div className="text-gray-600 font-sans">Restaurant Seating</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
