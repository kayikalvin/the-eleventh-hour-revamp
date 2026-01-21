import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, MapPin, ExternalLink, Calendar, Users } from 'lucide-react';

// Mock reviews data (used as a fallback)
const mockReviews = [
  {
    id: 1,
    author: 'Sarah M.',
    rating: 5,
    text: 'Best coffee in London! The atmosphere is cozy and the staff are incredibly friendly. Their croissants are to die for!',
    date: '2 weeks ago',
    photo: 'data:image/jpeg;base64,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'
  },
  {
    id: 2,
    author: 'James L.',
    rating: 5,
    text: 'Found this hidden gem while exploring the area. The flat white was perfection. Will definitely be back!',
    date: '1 month ago',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    author: 'Emma R.',
    rating: 4,
    text: 'Love the pet-friendly policy! My dog gets so excited when we visit. Great coffee and wonderful service.',
    date: '3 weeks ago',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    author: 'David K.',
    rating: 5,
    text: 'The attention to detail here is impressive. From the latte art to the music selection, everything is perfect.',
    date: '2 days ago',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80'
  }
];

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(4.8);

  // Commented out Google Places API integration for now, using mock data
  useEffect(() => {
    setReviews(mockReviews);
  }, []);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`${i < rating ? 'text-amber-500 fill-amber-500' : 'text-gray-200'}`}
        size={20}
      />
    ));
  };

  // Calculate rating distribution
  const ratingDistribution = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  return (
    <section id="reviews" className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full mb-6">
            <Users size={16} />
            <span className="text-sm font-medium">Trusted by {reviews.length}+ Customers</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Customer Reviews
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real experiences from our coffee-loving community
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Rating Summary Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-5xl font-bold text-gray-900 mb-2">{averageRating}</div>
                <div className="flex gap-1 mb-2">{renderStars(Math.floor(averageRating))}</div>
                <div className="text-gray-600 text-sm">Overall Rating</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 mb-1">{reviews.length}</div>
                <div className="text-gray-600 text-sm">Total Reviews</div>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-3 mb-8">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = ratingDistribution[rating];
                const percentage = (count / reviews.length) * 100;
                
                return (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-600 w-6">{rating}</span>
                    <Star className="text-amber-500 fill-amber-500" size={16} />
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-amber-500 rounded-full"
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                  </div>
                );
              })}
            </div>

            <a
              href="https://g.page/r/Cg.../review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl"
            >
              <ExternalLink size={18} />
              <span className="font-semibold">Write a Review</span>
            </a>
          </motion.div>

          {/* Featured Review Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100"
          >
            <div className="flex items-center gap-2 text-amber-600 mb-6">
              <Calendar size={18} />
              <span className="text-sm font-medium">Featured Review</span>
            </div>
            
            <div className="flex items-start gap-4 mb-6">
              <img
                src={reviews[0]?.photo}
                alt={reviews[0]?.author}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-white"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex">{renderStars(reviews[0]?.rating)}</div>
                  <span className="text-sm font-medium text-gray-700">{reviews[0]?.rating}.0</span>
                </div>
                <h4 className="font-semibold text-gray-900">{reviews[0]?.author}</h4>
                <p className="text-sm text-gray-600">{reviews[0]?.date}</p>
              </div>
            </div>
            
            <p className="text-gray-700 italic border-l-4 border-amber-500 pl-4 py-2">
              "{reviews[0]?.text}"
            </p>
          </motion.div>
        </div>

        {/* Reviews Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ type: "spring", damping: 25 }}
                className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100"
              >
                <Quote className="text-amber-100 absolute top-6 right-6" size={48} />
                
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="relative">
                    <img
                      src={reviews[currentIndex]?.photo}
                      alt={reviews[currentIndex]?.author}
                      className="w-24 h-24 rounded-full object-cover ring-4 ring-amber-50"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {reviews[currentIndex]?.rating}.0
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {reviews[currentIndex]?.author}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar size={14} />
                          <span className="text-sm">{reviews[currentIndex]?.date}</span>
                        </div>
                      </div>
                      <div className="flex">{renderStars(reviews[currentIndex]?.rating)}</div>
                    </div>
                    
                    <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                      "{reviews[currentIndex]?.text}"
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={14} />
                      <span>Verified Customer · London</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 px-4">
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={prevReview}
                  className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-all border border-gray-200 hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="text-gray-700" size={24} />
                </motion.button>
                
                <div className="hidden sm:flex items-center gap-2">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex ? 'bg-amber-500 w-8' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">{currentIndex + 1}</span>
                <span className="mx-2">/</span>
                <span>{reviews.length}</span>
              </div>
              
              <motion.button
                onClick={nextReview}
                className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-all border border-gray-200 hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="text-gray-700" size={24} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-8 border border-amber-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Share Your Experience
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We value your feedback! Help others discover our coffee haven by sharing your thoughts.
            </p>
            <a
              href="https://g.page/r/Cg.../review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-3 rounded-xl hover:bg-black transition-colors shadow-lg hover:shadow-xl"
            >
              <MapPin size={18} />
              <span className="font-semibold">Review Us on Google Maps</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;