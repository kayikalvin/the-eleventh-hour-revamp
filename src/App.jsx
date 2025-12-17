// import React, { useState, useEffect } from 'react';
// import { motion, useScroll, useSpring } from 'framer-motion';
// import Navigation from '../src/components/Navigation';
// import Hero from '../src/components/Hero';
// import About from '../src/components/About';
// import Menu from '../src/components/Menu';
// import Hours from '../src/components/Hours';
// import Video from '../src/components/Video';
// import Reviews from '../src/components/Reviews';
// import Ratings from '../src/components/Ratings';
// import Contact from '../src/components/Contact';
// import { ChevronUp } from 'lucide-react';

// function App() {
//   const { scrollYProgress } = useScroll();
//   const scaleX = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001
//   });

//   const [showScrollTop, setShowScrollTop] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setShowScrollTop(window.scrollY > 500);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Progress bar */}
//       <motion.div
//         className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
//         style={{ scaleX }}
//       />
      
//       <Navigation />
//       <Hero />
//       <About />
//       <Menu />
//       <Hours />
//       <Video />
//       <Reviews />
//       <Ratings />
//       <Contact />
      
//       {/* Footer */}
//       <footer className="bg-dark text-light py-12 px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="mb-6 md:mb-0">
//               <h2 className="text-4xl font-serif font-bold mb-4">THE<br />ELEVENTH<br />HOUR</h2>
//               <p className="text-gray-400">@theeleventhhour.uk</p>
//             </div>
            
//             <div className="text-center md:text-right">
//               <p className="text-gray-400 mb-2">18, Wardian, 1 Erebus Gdns</p>
//               <p className="text-gray-400 mb-2">Wards Pl, London E14 9ED</p>
//               <p className="text-gray-400">© {new Date().getFullYear()} The Eleventh Hour</p>
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* Scroll to top button */}
//       {showScrollTop && (
//         <motion.button
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: 20 }}
//           onClick={scrollToTop}
//           className="fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-light transition-all duration-300 z-40"
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//         >
//           <ChevronUp size={24} />
//         </motion.button>
//       )}
//     </div>
//   );
// }

// export default App;




import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Navigation from '../src/components/Navigation';
import Hero from '../src/components/Hero';
import About from '../src/components/About';
import Menu from '../src/components/Menu';
import Hours from '../src/components/Hours';
import Video from '../src/components/Video';
import Reviews from '../src/components/Reviews';
import Ratings from '../src/components/Ratings';
import Contact from '../src/components/Contact';
import { ChevronUp, Coffee, Facebook, Instagram, Mail, MapPin, Phone, Sparkles } from 'lucide-react';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax effect for floating elements
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Animated gradient background */}
      <div 
        className="fixed inset-0 -z-10 opacity-5 pointer-events-none"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(120, 119, 198, 0.15), transparent 80%)`,
        }}
      />
      
      {/* Floating decorative elements */}
      <motion.div 
        className="fixed top-20 left-10 w-6 h-6 rounded-full bg-primary/10 -z-10"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="fixed bottom-40 right-16 w-8 h-8 rounded-full bg-secondary/10 -z-10"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Progress bar with improved styling */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-50 origin-left shadow-lg"
        style={{ scaleX }}
      />
      
      <Navigation />
      <Hero />
      <About />
      <Menu />
      <Hours />
      <Video />
      <Reviews />
      {/* <Ratings /> */}
      <Contact />
      
      {/* Enhanced Footer */}
      <footer className="relative bg-dark text-light py-16 px-4 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
            {/* Brand section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Coffee className="text-primary" size={24} />
                </div>
                <h2 className="text-4xl font-serif font-bold">
                  THE<br />ELEVENTH<br />HOUR
                </h2>
              </div>
              <p className="text-gray-400 text-lg">
                Where every hour is the perfect time for great coffee and company.
              </p>
              <div className="flex gap-4">
                <motion.a
                  href="https://instagram.com/theeleventhhour.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-full hover:bg-primary transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram size={20} />
                </motion.a>
                <motion.a
                  href="https://facebook.com/theeleventhhour"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-full hover:bg-blue-600 transition-colors"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Facebook size={20} />
                </motion.a>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Sparkles size={20} className="text-primary" />
                Quick Links
              </h3>
              <ul className="space-y-3">
                {['Menu', 'Hours', 'About', 'Reviews', 'Contact'].map((item) => (
                  <li key={item}>
                    <motion.a
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Visit Us</h3>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary mt-1 flex-shrink-0" />
                  <p>18, Wardian, 1 Erebus Gdns<br />Wards Pl, London E14 9ED</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-primary flex-shrink-0" />
                  <a href="tel:+442071234567" className="hover:text-primary transition-colors">
                    +44 20 7123 4567
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-primary flex-shrink-0" />
                  <a href="mailto:hello@theeleventhhour.uk" className="hover:text-primary transition-colors">
                    hello@theeleventhhour.uk
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} The Eleventh Hour. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced Scroll to top button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-br from-primary to-secondary text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 z-40 group"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="relative">
            <ChevronUp size={24} className="group-hover:-translate-y-1 transition-transform" />
            <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
          </div>
        </motion.button>
      )}

      {/* Cursor follower effect (optional) */}
      <motion.div
        className="fixed w-64 h-64 rounded-full bg-primary/5 pointer-events-none z-0"
        style={{
          x: mousePosition.x * 20 - 10,
          y: mousePosition.y * 20 - 10,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      />
    </div>
  );
}

export default App;