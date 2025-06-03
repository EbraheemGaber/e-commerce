import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch categories');
        setLoading(false);
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  // Category icons mapping (you would replace these with actual icons)
  const categoryIcons = {
    "electronics": "💻",
    "jewelery": "💍",
    "men's clothing": "👔",
    "women's clothing": "👗"
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="categories" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
          <p className="text-gray-600">Browse our products by category</p>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.div 
              key={index}
              variants={item}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="p-6 text-center">
                <div className="text-4xl mb-4">{categoryIcons[category] || '🛍️'}</div>
                <h3 className="text-xl font-semibold capitalize mb-2">
                  {category.replace(/^(.)|\s+(.)/g, c => c.toUpperCase())}
                </h3>
                <p className="text-gray-600 text-sm">Explore our collection</p>
              </div>
              <div className="bg-primary py-3 text-center">
                <span className="font-medium">Shop Now</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
