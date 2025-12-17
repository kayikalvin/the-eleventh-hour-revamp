// import React from 'react';
// import { motion } from 'framer-motion';
// import { ChevronDown, MapPin } from 'lucide-react';

// const Hero = () => {
//   return (
//     <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Background Image/Video Placeholder */}
//       <div className="absolute inset-0 z-0">
//         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20 z-10" />
//         <img
//           src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1920&auto=format&fit=crop"
//           alt="Coffee shop interior"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       <div className="relative z-20 text-center text-white px-4 max-w-6xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//           className="mb-8"
//         >
//           <h1 className="text-6xl md:text-8xl font-serif font-bold mb-6 leading-tight">
//             THE<br />ELEVENTH<br />HOUR
//           </h1>
//           <p className="text-xl md:text-2xl font-light mb-8">Your neighbourhood coffee shop</p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5, duration: 1 }}
//           className="space-y-6"
//         >
//           <p className="text-lg md:text-xl max-w-2xl mx-auto">
//             At The Eleventh Hour, we believe that everyone deserves great coffee. 
//             A hidden gem in the hustle of the city with delicious blends, pastries and snacks.
//           </p>
          
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <motion.a
//               href="#menu"
//               className="bg-primary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-light transition-colors duration-300 inline-flex items-center gap-2"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               View Our Menu
//             </motion.a>
//             <motion.a
//               href="#contact"
//               className="border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-dark transition-all duration-300 inline-flex items-center gap-2"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <MapPin size={20} />
//               Visit Us
//             </motion.a>
//           </div>
//         </motion.div>

//         {/* Scroll Indicator */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
//           className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
//         >
//           <ChevronDown size={32} />
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Hero;



import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MapPin, Coffee, Sparkles } from 'lucide-react';

const Hero = () => {
  const scrollToContent = () => {
    window.scrollTo({ 
      top: window.innerHeight, 
      behavior: 'smooth' 
    });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background with parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark/90 via-dark/70 to-dark/90 z-10" />
        <motion.img
          src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1920&auto=format&fit=crop"
          alt="Coffee shop interior"
          className="w-full h-full object-cover scale-110"
          animate={{ scale: [1, 1.1] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        />
        {/* Animated grain texture */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              y: [0, 30, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-20 text-center text-white px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          {/* Animated title */}
          <div className="relative inline-block mb-6">
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 blur-2xl rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <h1 className="relative text-7xl md:text-9xl font-serif font-bold leading-[0.85] tracking-tighter">
              <span className="block bg-gradient-to-r from-white via-primary/20 to-white bg-clip-text text-transparent">
                THE
              </span>
              <span className="block bg-gradient-to-r from-white via-primary/30 to-white bg-clip-text text-transparent">
                ELEVENTH
              </span>
              <span className="block bg-gradient-to-r from-white via-secondary/20 to-white bg-clip-text text-transparent">
                HOUR
              </span>
            </h1>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Coffee size={24} className="text-primary" />
            <p className="text-2xl md:text-3xl font-light tracking-widest uppercase">
              Your neighbourhood coffee sanctuary
            </p>
            <Sparkles size={24} className="text-secondary" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="space-y-8 max-w-2xl mx-auto"
        >
          <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-200">
            Where exceptional coffee meets community spirit. A hidden gem in London's heart, 
            crafting moments worth savoring with every cup.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.a
              href="#menu"
              className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Explore Our Menu</span>
              <ChevronDown size={20} className="relative z-10 group-hover:translate-y-1 transition-transform" />
            </motion.a>
            
            <motion.a
              href="#contact"
              className="group relative bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300 inline-flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MapPin size={20} className="group-hover:scale-110 transition-transform" />
              <span>Find Your Way Here</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        {/* <motion.button
          onClick={scrollToContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-300 tracking-widest uppercase group-hover:text-white transition-colors">
              Discover More
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors"
            >
              <ChevronDown size={24} className="group-hover:scale-110 transition-transform" />
            </motion.div>
          </div>
        </motion.button> */}
      </div>
    </section>
  );
};

export default Hero;