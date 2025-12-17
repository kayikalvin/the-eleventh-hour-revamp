import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Coffee, PawPrint } from 'lucide-react';

const Hours = () => {
  const hours = [
    { day: 'Monday - Friday', hours: '7:00 AM - 5:00 PM', icon: <Coffee size={24} /> },
    { day: 'Saturday', hours: '8:00 AM - 5:00 PM', icon: <Clock size={24} /> },
    { day: 'Sunday', hours: '8:00 AM - 5:00 PM', icon: <Clock size={24} /> }
  ];

  return (
    <section id="hours" className="py-20 px-4 bg-dark text-light">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Opening Hours
          </h2>
          <p className="text-xl text-gray-300">
            Come see us anytime we're open - we'd love to have you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {hours.map((time, index) => (
            <motion.div
              key={time.day}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center border border-white/20"
            >
              <div className="inline-block p-3 bg-primary/20 rounded-full mb-4">
                <div className="text-primary">{time.icon}</div>
              </div>
              <h3 className="text-2xl font-semibold mb-2">{time.day}</h3>
              <p className="text-3xl font-bold text-primary mb-4">{time.hours}</p>
              <div className="h-1 w-16 bg-primary mx-auto mb-4" />
              <p className="text-gray-300">Kitchen closes 30 minutes before closing</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/20 rounded-full">
            <PawPrint className="text-primary" size={24} />
            <span className="text-xl font-semibold">Pet Friendly All Day!</span>
          </div>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Our outdoor seating area is always open to well-behaved pets. 
            We even have special treats for your furry friends!
          </p>
        </motion.div>

        {/* Holiday Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-block px-6 py-3 bg-accent/10 rounded-2xl border border-accent/20">
            <p className="text-accent">
              <span className="font-semibold">Note:</span> Hours may vary on bank holidays. 
              Follow us on social media for updates!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hours;