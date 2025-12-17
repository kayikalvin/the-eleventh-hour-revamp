// import React from 'react';
// import { motion } from 'framer-motion';
// import { Coffee, Moon, Croissant, Clock } from 'lucide-react';

// const About = () => {
//   const features = [
//     {
//       icon: <Coffee className="text-primary" size={32} />,
//       title: "Specialty Coffee Daily",
//       description: "Start Every Day Fresh"
//     },
//     {
//       icon: <Moon className="text-primary" size={32} />,
//       title: "Cocktails by Night",
//       description: "Coming Soon"
//     },
//     {
//       icon: <Croissant className="text-primary" size={32} />,
//       title: "Fresh Pastries",
//       description: "Sweet Treats"
//     },
//     {
//       icon: <Clock className="text-primary" size={32} />,
//       title: "Served Daily",
//       description: "Quality You Can Trust"
//     }
//   ];

//   return (
//     <section id="about" className="py-20 px-4 bg-accent/20">
//       <div className="max-w-7xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-6">
//             More Than Just Coffee
//           </h2>
//           <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
//             We're a community hub where every cup tells a story. From morning brews 
//             to evening cocktails, we're here for you at the eleventh hour.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {features.map((feature, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1 }}
//               whileHover={{ y: -10, scale: 1.02 }}
//               className="bg-white p-8 rounded-2xl shadow-lg text-center"
//             >
//               <div className="inline-block p-4 bg-accent/30 rounded-full mb-4">
//                 {feature.icon}
//               </div>
//               <h3 className="text-xl font-semibold text-dark mb-2">{feature.title}</h3>
//               <p className="text-gray-600">{feature.description}</p>
//             </motion.div>
//           ))}
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="mt-16 text-center"
//         >
//           <div className="inline-block px-6 py-2 bg-primary/10 rounded-full">
//             <span className="text-primary font-semibold">🐾 Pet friendly</span>
//           </div>
//           <p className="mt-4 text-gray-700">
//             Bring your furry friends! We welcome well-behaved pets in our outdoor seating area.
//           </p>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default About;








import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Coffee, Moon, Croissant, Clock, Sparkles } from 'lucide-react';

const About = () => {
  const containerRef = useRef(null);
  
  // Hook for tracking scroll progress within this specific section[citation:3]
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"] // Triggers when section enters and leaves viewport
  });
  
  // Create parallax motion values[citation:1][citation:8]
  // Different elements will move at different speeds (y1, y2)
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const features = [
    { icon: <Coffee size={32} />, title: "Specialty Coffee Daily", description: "Start Every Day Fresh" },
    { icon: <Moon size={32} />, title: "Cocktails by Night", description: "Coming Soon" },
    { icon: <Croissant size={32} />, title: "Fresh Pastries", description: "Sweet Treats" },
    { icon: <Clock size={32} />, title: "Served Daily", description: "Quality You Can Trust" }
  ];

  // Variants for staggered animations[citation:6]
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delays between each child's animation
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative py-32 px-4 overflow-hidden"
    >
      {/* --- Background Parallax Layers --- */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0 opacity-10"
      >
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </motion.div>
      
      <motion.div 
        style={{ y: y2 }}
        className="absolute inset-0 z-0"
      >
        {/* Subtle grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgba(120,119,198,0.05) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(120,119,198,0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />
      </motion.div>
      {/* --- End Background --- */}

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <Sparkles className="text-primary" size={24} />
            <span className="text-sm font-semibold tracking-widest text-primary uppercase">
              Our Philosophy
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-dark mb-8 leading-tight">
            More Than
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Just Coffee
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            We're a community hub where every cup tells a story. From morning brews 
            to evening cocktails, we're here for you at the eleventh hour.
          </p>
        </motion.div>

        {/* Features Grid with Staggered Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              // Enhanced hover effects[citation:6]
              whileHover={{ 
                y: -12, 
                scale: 1.03,
                transition: { type: "spring", stiffness: 400 }
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative"
            >
              {/* Glassmorphism Card[citation:2][citation:7] */}
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/80 to-white/40 
                            backdrop-blur-xl border border-white/50 shadow-2xl 
                            shadow-primary/10 hover:shadow-primary/20 transition-shadow duration-500
                            before:absolute before:inset-0 before:rounded-3xl 
                            before:bg-gradient-to-br before:from-white/60 before:to-transparent 
                            before:opacity-0 group-hover:before:opacity-100 before:transition-opacity 
                            before:duration-500 before:-z-10">
                
                <div className="relative z-10">
                  <motion.div 
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="inline-flex p-4 rounded-2xl mb-6 
                             bg-gradient-to-br from-primary/10 to-secondary/10 
                             group-hover:from-primary/20 group-hover:to-secondary/20 
                             transition-all duration-300"
                  >
                    <div className="text-primary">
                      {feature.icon}
                    </div>
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-800 transition-colors">
                    {feature.description}
                  </p>
                </div>
                
                {/* Animated border effect on hover */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent 
                              group-hover:border-primary/20 transition-all duration-500 -z-10" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pet-Friendly Badge with Enhanced Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: "spring" }}
          className="mt-20 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full 
                     bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 
                     backdrop-blur-sm border border-white/50 shadow-lg"
          >
            <div className="text-3xl">🐾</div>
            <div className="text-left">
              <div className="font-bold text-dark">Pet Friendly Space</div>
              <div className="text-sm text-gray-600">
                Well-behaved pets welcome in our outdoor seating
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;