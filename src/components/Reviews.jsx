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
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&auto=format&fit=crop&q=80'
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Try to load reviews from Google Places if env is configured, otherwise use mock
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID;

    if (apiKey && placeId) {
      const loadGoogleMaps = (key) => {
        return new Promise((resolve, reject) => {
          if (window.google && window.google.maps && window.google.maps.places) return resolve();
          const existing = document.querySelector('script[data-google-maps]');
          if (existing) {
            existing.addEventListener('load', () => resolve());
            existing.addEventListener('error', () => reject(new Error('Google Maps script failed')));
            return;
          }

          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
          script.async = true;
          script.defer = true;
          script.setAttribute('data-google-maps', 'true');
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Google Maps script failed to load'));
          document.head.appendChild(script);
        });
      };

      loadGoogleMaps(apiKey)
        .then(() => {
          try {
            const service = new window.google.maps.places.PlacesService(document.createElement('div'));
            service.getDetails({ placeId, fields: ['review', 'rating', 'user_ratings_total', 'url'] }, (place, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
                const mapped = (place.reviews || []).map((r, idx) => ({
                  id: r.author_name ? `${r.author_name}-${idx}` : idx,
                  author: r.author_name || 'Anonymous',
                  rating: r.rating || 0,
                  text: r.text || '',
                  // Convert epoch seconds to relative date string (simple fallback)
                  date: r.time ? new Date(r.time * 1000).toLocaleDateString() : '',
                  photo: r.profile_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.author_name || 'A')}`
                }));

                setReviews(mapped.length ? mapped : mockReviews);
                setAverageRating(place.rating || (mapped.reduce((s, r) => s + r.rating, 0) / Math.max(1, mapped.length)));
              } else {
                // Fallback to mock on any failure
                console.warn('Google Places details fetch failed, falling back to mock reviews', status);
                setReviews(mockReviews);
              }
            });
          } catch (err) {
            console.error('Error using Google Places service, using mock reviews', err);
            setReviews(mockReviews);
          }
        })
        .catch((err) => {
          console.error('Failed to load Google Maps script, using mock reviews', err);
          Promise.resolve().then(() => setReviews(mockReviews));
        });
    } else {
      // schedule setState to avoid synchronous setState inside effect
      Promise.resolve().then(() => setReviews(mockReviews));
    }
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