import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">ShopEase</h3>
            <p className="text-gray-400 mb-4">
              Your one-stop destination for all your shopping needs. Quality products, competitive prices, and excellent customer service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-primary transition-colors">Home</a>
              </li>
              <li>
                <a href="#products" className="text-gray-400 hover:text-primary transition-colors">Products</a>
              </li>
              <li>
                <a href="#categories" className="text-gray-400 hover:text-primary transition-colors">Categories</a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-primary transition-colors">Testimonials</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">My Account</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Order Tracking</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Wishlist</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Shopping Cart</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Returns & Exchanges</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">FAQs</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-primary mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-400">123 Shopping Street, E-commerce City, 10001</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-primary mr-2 flex-shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-primary mr-2 flex-shrink-0" />
                <span className="text-gray-400">support@shopease.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <h5 className="text-sm font-semibold mb-2">Subscribe to our newsletter</h5>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none flex-1"
                />
                <button className="bg-primary text-black px-4 py-2 rounded-r-lg font-medium hover:bg-accent transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">Shipping Info</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
