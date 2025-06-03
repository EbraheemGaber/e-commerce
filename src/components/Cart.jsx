import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would fetch from localStorage, context API, or a backend
    // For demo purposes, we'll use localStorage
    const fetchCartItems = () => {
      setLoading(true);
      try {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCartItems();
  }, []);
  
  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Calculate total items
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const handleQuantityChange = (id, change) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  
  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
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
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
            <Link to="/" className="flex items-center text-gray-600 hover:text-primary transition-colors">
              <ArrowLeft size={18} className="mr-1" />
              <span>Continue Shopping</span>
            </Link>
          </div>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
              <Link 
                to="/" 
                className="bg-primary hover:bg-accent text-black font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="border-b border-gray-200 pb-2 mb-4 hidden md:flex">
                <div className="w-2/5 text-gray-600 font-medium">Product</div>
                <div className="w-1/5 text-center text-gray-600 font-medium">Price</div>
                <div className="w-1/5 text-center text-gray-600 font-medium">Quantity</div>
                <div className="w-1/5 text-right text-gray-600 font-medium">Total</div>
              </div>
              
              {cartItems.map(item => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col md:flex-row items-center py-4 border-b border-gray-200"
                >
                  <div className="w-full md:w-2/5 flex items-center mb-4 md:mb-0">
                    <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium text-gray-800 mb-1 line-clamp-2">{item.title}</h3>
                      <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/5 text-center mb-4 md:mb-0">
                    <span className="md:hidden text-gray-600 mr-2">Price:</span>
                    <span className="font-medium">${item.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="w-full md:w-1/5 flex justify-center items-center mb-4 md:mb-0">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button 
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-3 py-1 border-x border-gray-300 min-w-[40px] text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/5 flex justify-between md:justify-end items-center">
                    <div>
                      <span className="md:hidden text-gray-600 mr-2">Total:</span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="ml-4 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
              
              <div className="mt-8 flex flex-col md:flex-row justify-between items-start">
                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Order Summary</h3>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Items ({totalItems}):</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Shipping:</span>
                      <span>Free</span>
                    </div>
                    <div className="border-t border-gray-200 my-2 pt-2 flex justify-between font-medium">
                      <span>Total:</span>
                      <span className="text-lg">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-1/2 md:pl-8">
                  <button className="w-full bg-primary hover:bg-accent text-black font-semibold py-3 px-6 rounded-lg transition-colors mb-3">
                    Proceed to Checkout
                  </button>
                  <Link 
                    to="/" 
                    className="w-full block text-center border border-gray-300 hover:border-gray-400 font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
