import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [lovedProducts, setLovedProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch products only once on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(response.data.map(product => product.category))];
        setCategories(uniqueCategories);
        
        // Load cart and loved products from localStorage
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);
          setCartProducts(parsedCart.map(item => item.id));
        }
        
        const storedLoved = localStorage.getItem('loved');
        if (storedLoved) {
          const lovedItems = JSON.parse(storedLoved);
          setLovedProducts(lovedItems.map(item => item.id));
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  // Apply filtering and sorting whenever products, selectedCategory, or sortOrder changes
  useEffect(() => {
    if (!products.length) return;
    
    console.log('Filtering products. Category:', selectedCategory, 'Sort:', sortOrder);
    
    // Create a new array from products to avoid reference issues
    let result = [...products];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply sorting
    if (sortOrder === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }
    
    console.log('Filtered products count:', result.length);
    setFilteredProducts(result);
  }, [products, selectedCategory, sortOrder]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    
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
    
    // Check if product is already in cart
    const existingItemIndex = currentCart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if already in cart
      currentCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item with quantity 1
      currentCart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: 1
      });
      
      // Update cart products state for UI
      setCartProducts(prev => [...prev, product.id]);
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(currentCart));
    
    // Dispatch custom event for cart update
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleToggleLove = (e, product) => {
    e.stopPropagation();
    
    // Get current loved items
    let currentLoved = [];
    try {
      const storedLoved = localStorage.getItem('loved');
      if (storedLoved) {
        currentLoved = JSON.parse(storedLoved);
      }
    } catch (err) {
      console.error('Error parsing loved data:', err);
    }
    
    // Check if product is already loved
    const isLoved = lovedProducts.includes(product.id);
    let updatedLovedIds;
    
    if (isLoved) {
      // Remove from loved
      updatedLovedIds = lovedProducts.filter(id => id !== product.id);
      currentLoved = currentLoved.filter(item => item.id !== product.id);
    } else {
      // Add to loved
      updatedLovedIds = [...lovedProducts, product.id];
      currentLoved.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category
      });
    }
    
    setLovedProducts(updatedLovedIds);
    localStorage.setItem('loved', JSON.stringify(currentLoved));
    
    // Dispatch custom event for loved update
    window.dispatchEvent(new Event('lovedUpdated'));
  };

  const handleCategoryChange = (category) => {
    console.log('Category changed from', selectedCategory, 'to', category);
    setSelectedCategory(category);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <section className="py-16">
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Our Products</h2>
          <p className="text-gray-600">Discover our high-quality products</p>
        </div>

        {/* Filters and Sorting */}
        <div className="mb-8">
          <button 
            onClick={toggleFilters}
            className="md:hidden w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4"
          >
            <div className="flex items-center">
              <Filter size={18} className="mr-2" />
              <span>Filters & Sorting</span>
            </div>
            {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          
          <div className={`md:flex justify-between items-center bg-white p-4 rounded-lg shadow-md ${showFilters ? 'block' : 'hidden md:flex'}`}>
            <div className="mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category:</label>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => handleCategoryChange('all')}
                  className={`px-3 py-1 rounded-full text-sm ${selectedCategory === 'all' ? 'bg-primary text-black' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  All
                </button>
                {categories.map(category => (
                  <button 
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3 py-1 rounded-full text-sm capitalize ${selectedCategory === category ? 'bg-primary text-black' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort by:</label>
              <select 
                value={sortOrder}
                onChange={(e) => handleSortChange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Debug info - current category */}
        <div className="mb-4 text-sm text-gray-500">
          <p>Current category: {selectedCategory}</p>
          <p>Products shown: {filteredProducts.length} of {products.length}</p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-primary/20 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => handleProductClick(product)}
              >
                <div className="relative h-64 bg-white overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => handleToggleLove(e, product)}
                      className={`p-2 rounded-full mb-2 ${lovedProducts.includes(product.id) ? 'bg-red-500 text-white' : 'bg-white text-gray-700'} shadow-md hover:shadow-lg transition-all`}
                    >
                      <Heart size={18} fill={lovedProducts.includes(product.id) ? "white" : "none"} />
                    </button>
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      className={`p-2 rounded-full ${cartProducts.includes(product.id) ? 'bg-primary text-black' : 'bg-white text-gray-700'} shadow-md hover:shadow-lg transition-all`}
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-1">{product.title}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500 capitalize">{product.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6 bg-gray-50 flex items-center justify-center">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.title}
                  className="max-h-[400px] object-contain"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{selectedProduct.title}</h2>
                <p className="text-sm text-gray-500 mb-4 capitalize">{selectedProduct.category}</p>
                <div className="mb-4">
                  <span className="text-2xl font-bold">${selectedProduct.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-700 mb-6">{selectedProduct.description}</p>
                <div className="flex space-x-4">
                  <button 
                    className="flex-1 bg-primary hover:bg-accent text-black font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                    onClick={(e) => handleAddToCart(e, selectedProduct)}
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    {cartProducts.includes(selectedProduct.id) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                  <button 
                    className={`p-3 rounded-lg border ${lovedProducts.includes(selectedProduct.id) ? 'bg-red-500 text-white border-red-500' : 'border-gray-300 hover:border-red-500'} transition-colors`}
                    onClick={(e) => handleToggleLove(e, selectedProduct)}
                  >
                    <Heart size={20} fill={lovedProducts.includes(selectedProduct.id) ? "white" : "none"} />
                  </button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Link 
                    to="/cart"
                    className="text-primary hover:text-accent font-medium flex items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    View Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
