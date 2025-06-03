import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Testimonials = () => {
  // Sample testimonial data
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Regular Customer',
      image: 'https://randomuser.me/api/portraits/women/32.jpg',
      rating: 5,
      text: 'I absolutely love shopping here! The products are high quality and the customer service is exceptional. The website is so easy to navigate and my orders always arrive on time.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Tech Enthusiast',
      image: 'https://randomuser.me/api/portraits/men/44.jpg',
      rating: 4,
      text: 'Great selection of electronics at competitive prices. The detailed product descriptions helped me make informed decisions. Will definitely shop here again!'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'Fashion Blogger',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      rating: 5,
      text: 'As someone who cares about style, I appreciate the curated collection of clothing items. Everything I\'ve purchased has exceeded my expectations in terms of quality and design.'
    }
  ];

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

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">What Our Customers Say</h2>
          <p className="text-gray-600">Hear from our satisfied customers</p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id}
              variants={item}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-primary"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    size={18}
                    fill={i < testimonial.rating ? "#FFB800" : "none"}
                    stroke={i < testimonial.rating ? "#FFB800" : "#CBD5E0"}
                    className="mr-1"
                  />
                ))}
              </div>
              
              <p className="text-gray-700">{testimonial.text}</p>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-end">
                  <span className="text-primary font-medium">Verified Purchase</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-12 text-center">
          <button className="bg-white border-2 border-primary text-black font-semibold px-8 py-3 rounded-full hover:bg-primary transition-colors">
            View All Reviews
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
