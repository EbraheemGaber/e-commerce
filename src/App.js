import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeSwiper from './components/HomeSwiper';
import Categories from './components/Categories';
import Products from './components/Products';
import Reviews from './components/Reviews';
import Cart from './components/Cart';
import Loved from './components/Loved';
import Footer from './components/Footer';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [lovedCount, setLovedCount] = useState(0);

  // Update cart and loved items count
  useEffect(() => {
    const updateCounts = () => {
      // Update cart count
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        const cartItems = JSON.parse(storedCart);
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(totalItems);
      }
      
      // Update loved count
      const storedLoved = localStorage.getItem('loved');
      if (storedLoved) {
        setLovedCount(JSON.parse(storedLoved).length);
      }
    };
    
    // Initial update
    updateCounts();
    
    // Listen for storage changes
    window.addEventListener('storage', updateCounts);
    
    // Custom event for cart updates
    window.addEventListener('cartUpdated', updateCounts);
    window.addEventListener('lovedUpdated', updateCounts);
    
    return () => {
      window.removeEventListener('storage', updateCounts);
      window.removeEventListener('cartUpdated', updateCounts);
      window.removeEventListener('lovedUpdated', updateCounts);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar cartCount={cartCount} lovedCount={lovedCount} />
        <Routes>
          <Route path="/" element={
            <main className="pt-16"> {/* Add padding top to account for fixed navbar */}
              <HomeSwiper />
              <Categories />
              <Products />
              <Reviews />
            </main>
          } />
          <Route path="/cart" element={<Cart />} />
          <Route path="/loved" element={<Loved />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
