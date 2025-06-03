import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Loved = () => {
  const [lovedItems, setLovedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would fetch from localStorage, context API, or a backend
    const fetchLovedItems = () => {
      setLoading(true);
      try {
        const storedLoved = localStorage.getItem('loved');
        if (storedLoved) {
          setLovedItems(JSON.parse(storedLoved));
        }
      } catch (error) {
        console.error('Error fetching loved items:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLovedItems();
  }, []);
  
  const handleRemoveItem = (id) => {
    const updatedLoved = lovedItems.filter(item => item.id !== id);
    setLovedItems(updatedLoved);
    localStorage.setItem('loved', JSON.stringify(updatedLoved));
    
    // Update loved count in navbar
    window.dispatchEvent(new Event('lovedUpdated'));
  };
  
  const handleAddToCart = (item) => {
    // Get current cart
    let currentCart = [];
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        currentCart = JSON.parse(storedCart);
      }
    } catch (err) {
      console.error('Error parsing cart data:', err);
    }
    
    // Check if item is already in cart
    const existingItemIndex = currentCart.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if already in cart
      currentCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item with quantity 1
      currentCart.push({
        ...item,
        quantity: 1
      });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(currentCart));
    
    // Dispatch custom event for cart update
    window.dispatchEvent(new Event('cartUpdated'));
  };
  
  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="container mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="container mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Loved Items</h1>
            <Link to="/" className="flex items-center text-gray-600 hover:text-primary transition-colors">
              <ArrowLeft size={18} className="mr-1" />
              <span>Continue Shopping</span>
            </Link>
          </div>
          
          {lovedItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">❤️</div>
              <h2 className="text-xl font-semibold mb-2">Your loved items list is empty</h2>
              <p className="text-gray-500 mb-6">Looks like you haven't added any products to your favorites yet.</p>
              <Link 
                to="/" 
                className="bg-primary hover:bg-accent text-black font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {lovedItems.map(item => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-primary/20 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 bg-white overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-contain p-4"
                    />
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                      aria-label="Remove from loved items"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800 mb-1 line-clamp-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 capitalize mb-2">{item.category}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">${item.price?.toFixed(2)}</span>
                      <button 
                        onClick={() => handleAddToCart(item)}
                        className="bg-primary hover:bg-accent text-black text-sm font-medium py-1 px-3 rounded transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Loved;
