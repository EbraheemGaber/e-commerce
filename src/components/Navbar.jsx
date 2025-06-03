import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Menu, X } from "lucide-react";

const Navbar = ({ cartCount = 0, lovedCount = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white/90 py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-accent">
              online shop
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="font-medium hover:text-accent transition-colors"
            >
              Home
            </Link>
            <a
              href="#features"
              className="font-medium hover:text-accent transition-colors"
            >
              Features
            </a>
            <a
              href="#blog"
              className="font-medium hover:text-accent transition-colors"
            >
              Blog
            </a>
            <a
              href="#contact"
              className="font-medium hover:text-accent transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Icons Section */}
          <div className="flex items-center space-x-4">
            <Link
              to="/loved"
              className="relative p-2 hover:bg-accent/20 rounded-full transition-colors"
            >
              <Heart size={20} />
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {lovedCount}
              </span>
            </Link>

            <Link
              to="/cart"
              className="relative p-2 hover:bg-accent/20 rounded-full transition-colors"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-accent/20 rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="font-medium hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <a
                href="#features"
                className="font-medium hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#blog"
                className="font-medium hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </a>
              <a
                href="#contact"
                className="font-medium hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
              <Link
                to="/loved"
                className="font-medium hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Loved Items
              </Link>
              <Link
                to="/cart"
                className="font-medium hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
