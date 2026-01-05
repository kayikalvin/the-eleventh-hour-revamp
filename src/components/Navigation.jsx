import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Menu as MenuIcon, X, ShoppingBag } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const menuRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  const navItems = [
    { label: 'Home', href: 'home' },
    { label: 'About', href: 'about' },
    { label: 'Menu', href: 'menu' },
    { label: 'Hours', href: 'hours' },
    { label: 'Reviews', href: 'reviews' },
    { label: 'Contact', href: 'contact' }
  ];

  // Smooth scroll function
  const smoothScrollTo = (elementId, offset = 80) => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`Element with id "${elementId}" not found`);
      return;
    }

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  // Handle navigation click
  const handleNavClick = (sectionId, event) => {
    if (event) {
      event.preventDefault();
    }
    
    setIsOpen(false);
    setActiveSection(sectionId);
    
    // Small delay to ensure state updates before scrolling
    setTimeout(() => {
      smoothScrollTo(sectionId);
    }, 10);
  };

  // Scroll handler to update active section
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
    
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Debounce scroll handler
    scrollTimeoutRef.current = setTimeout(() => {
      const sections = navItems.map(item => item.href);
      const scrollPosition = window.scrollY + 100; // Offset for header
      
      let currentSection = 'home';
      
      // Check each section
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = sectionId;
            break;
          }
        }
      }
      
      setActiveSection(currentSection);
    }, 100);
  }, [navItems]);

  // Close mobile menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Manage body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  // Keyboard navigation
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleOrderClick = () => {
    setIsOpen(false);
    // You can add analytics or other side effects here
    console.log('Order Online clicked');
    window.open('https://order.example.com', '_blank');
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-lg py-3' 
          : 'bg-white/90 backdrop-blur-sm py-5'
      }`}
      role="navigation"
      aria-label="Main Navigation"
      ref={menuRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.button
            type="button"
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => handleNavClick('home', e)}
            aria-label="The Eleventh Hour - Home"
          >
            <Coffee className="text-primary" size={28} aria-hidden="true" />
            <span className="text-xl md:text-2xl font-serif font-bold text-gray-900">
              THE ELEVENTH HOUR
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center font-semibold text-lg space-x-1 lg:space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.label}
                type="button"
                className={`px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  activeSection === item.href
                    ? 'text-primary font-semibold bg-primary/10'
                    : 'text-gray-700 hover:text-primary hover:bg-gray-100'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleNavClick(item.href, e)}
                aria-current={activeSection === item.href ? 'page' : undefined}
              >
                {item.label}
              </motion.button>
            ))}
            {/* <motion.button
              type="button"
              className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full hover:bg-primary/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOrderClick}
              aria-label="Order Online"
            >
              <ShoppingBag size={18} aria-hidden="true" />
              <span>Order Online</span>
            </motion.button> */}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            type="button"
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-menu"
          >
            {isOpen ? (
              <X size={28} aria-hidden="true" />
            ) : (
              <MenuIcon size={28} aria-hidden="true" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu with AnimatePresence */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <motion.button
                    key={item.label}
                    type="button"
                    className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      activeSection === item.href
                        ? 'text-primary font-semibold bg-primary/10'
                        : 'text-gray-700 hover:text-primary hover:bg-gray-100'
                    }`}
                    onClick={(e) => handleNavClick(item.href, e)}
                    whileTap={{ scale: 0.98 }}
                    aria-current={activeSection === item.href ? 'page' : undefined}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.button
                  type="button"
                  className="flex items-center justify-center gap-2 w-full bg-primary text-white px-6 py-3.5 rounded-full hover:bg-primary/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 mt-2"
                  whileTap={{ scale: 0.98 }}
                  onClick={handleOrderClick}
                  aria-label="Order Online"
                >
                  <ShoppingBag size={18} aria-hidden="true" />
                  <span>Order Online</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;