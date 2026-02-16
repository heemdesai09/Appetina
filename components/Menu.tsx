'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  isVeg: boolean;
}

interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export default function Menu() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await fetch('/api/menu');
      const data = await response.json();
      setCategories(data.categories);
      if (data.categories.length > 0) {
        setSelectedCategory(data.categories[0].id);
      }
    } catch (error) {
      console.error('Error fetching menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = selectedCategory
    ? categories.find((cat) => cat.id === selectedCategory)?.items || []
    : [];

  return (
    <section id="menu" className="section-container bg-gradient-to-b from-gray-50 to-white">
      <div ref={ref} className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="inline-block px-4 py-1.5 bg-maroon-100 text-maroon-700 rounded-full text-sm font-sans font-semibold mb-4"
        >
          OUR MENU
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display font-bold heading-gradient mb-6"
        >
          Culinary Excellence in Every Dish
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto font-body"
        >
          Explore our carefully curated menu featuring authentic flavors from across India
        </motion.p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-maroon-700 border-t-transparent"></div>
        </div>
      ) : (
        <>
          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-sans font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-maroon-800 to-maroon-700 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* Menu Items Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-display font-bold text-maroon-800 group-hover:text-maroon-900">
                        {item.name}
                      </h3>
                      <span
                        className={`w-3 h-3 rounded-full ${
                          item.isVeg ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                      />
                    </div>
                    {item.description && (
                      <p className="text-sm text-gray-600 font-body leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-2xl font-display font-bold text-maroon-700">
                    ₹{item.price}
                  </span>
                  <span className="text-xs text-gray-500 font-sans">per serving</span>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No items available in this category
            </div>
          )}
        </>
      )}

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5 }}
        className="text-center mt-16"
      >
        <div className="bg-gradient-to-r from-gold-600 to-gold-500 rounded-2xl p-8 text-white shadow-xl inline-block">
          <p className="text-xl font-body mb-4">
            Want to see our full menu or customize for your event?
          </p>
          <a
            href="tel:+919979448440"
            className="inline-block px-8 py-3 bg-white text-maroon-700 rounded-lg font-sans font-bold hover:bg-gray-100 transition-colors duration-300"
          >
            Call to Discuss Menu
          </a>
        </div>
      </motion.div>
    </section>
  );
}
