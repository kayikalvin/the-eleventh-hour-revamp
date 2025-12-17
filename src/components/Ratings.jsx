// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Star, ThumbsUp, Coffee, Croissant, Utensils, Wine } from 'lucide-react';

// const Ratings = () => {
//   const [ratings, setRatings] = useState({
//     coffee: 0,
//     pastries: 0,
//     food: 0,
//     cocktails: 0
//   });

//   const [submitted, setSubmitted] = useState(false);
//   const [hoveredStar, setHoveredStar] = useState({ category: null, value: 0 });

//   const categories = [
//     {
//       id: 'coffee',
//       name: 'Coffee',
//       icon: <Coffee className="text-primary" size={24} />,
//       currentRating: 4.7,
//       totalRatings: 128
//     },
//     {
//       id: 'pastries',
//       name: 'Pastries',
//       icon: <Croissant className="text-primary" size={24} />,
//       currentRating: 4.9,
//       totalRatings: 96
//     },
//     {
//       id: 'food',
//       name: 'Food',
//       icon: <Utensils className="text-primary" size={24} />,
//       currentRating: 4.5,
//       totalRatings: 64
//     },
//     {
//       id: 'cocktails',
//       name: 'Cocktails',
//       icon: <Wine className="text-primary" size={24} />,
//       currentRating: 4.8,
//       totalRatings: 42
//     }
//   ];

//   const handleStarClick = (category, value) => {
//     setRatings(prev => ({
//       ...prev,
//       [category]: value
//     }));
//   };

//   const handleSubmit = () => {
//     // In production, send to your backend
//     console.log('Ratings submitted:', ratings);
//     setSubmitted(true);
//     setTimeout(() => setSubmitted(false), 3000);
//   };

//   const renderStars = (category, interactive = false) => {
//     return [...Array(5)].map((_, index) => {
//       const value = index + 1;
//       const isFilled = interactive 
//         ? value <= (hoveredStar.category === category ? hoveredStar.value : ratings[category])
//         : value <= categories.find(c => c.id === category)?.currentRating;

//       return (
//         <motion.button
//           key={index}
//           type="button"
//           disabled={!interactive}
//           onClick={() => interactive && handleStarClick(category, value)}
//           onMouseEnter={() => interactive && setHoveredStar({ category, value })}
//           onMouseLeave={() => interactive && setHoveredStar({ category: null, value: 0 })}
//           whileHover={interactive ? { scale: 1.2 } : {}}
//           whileTap={interactive ? { scale: 0.9 } : {}}
//           className={interactive ? 'cursor-pointer' : 'cursor-default'}
//         >
//           <Star
//             className={`${isFilled ? 'text-yellow-400 fill-current' : 'text-gray-300'} ${
//               interactive ? 'hover:text-yellow-300' : ''
//             }`}
//             size={interactive ? 28 : 20}
//           />
//         </motion.button>
//       );
//     });
//   };

//   return (
//     <section className="py-20 px-4 bg-white">
//       <div className="max-w-7xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-4">
//             Rate Your Experience
//           </h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Help us improve by rating your favorite items
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
//           {/* Current Ratings Display */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             className="bg-gray-50 rounded-2xl p-8"
//           >
//             <h3 className="text-2xl font-semibold text-dark mb-6">Current Ratings</h3>
            
//             <div className="space-y-6">
//               {categories.map((category) => (
//                 <div key={category.id} className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-white rounded-lg shadow-sm">
//                       {category.icon}
//                     </div>
//                     <div>
//                       <div className="font-medium text-dark">{category.name}</div>
//                       <div className="text-sm text-gray-500">
//                         {category.totalRatings} ratings
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="text-right">
//                     <div className="flex gap-1 mb-1">
//                       {renderStars(category.id)}
//                     </div>
//                     <div className="text-2xl font-bold text-dark">
//                       {category.currentRating}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-8 pt-6 border-t border-gray-200">
//               <div className="flex items-center gap-2 text-gray-600">
//                 <ThumbsUp size={20} />
//                 <span>Based on 330+ customer ratings</span>
//               </div>
//             </div>
//           </motion.div>

//           {/* Rating Input */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             className="bg-accent/10 rounded-2xl p-8"
//           >
//             <h3 className="text-2xl font-semibold text-dark mb-6">Your Ratings</h3>
//             <p className="text-gray-600 mb-8">
//               How would you rate our offerings? (1 = Poor, 5 = Excellent)
//             </p>

//             <div className="space-y-8">
//               {categories.map((category) => (
//                 <div key={category.id}>
//                   <div className="flex items-center gap-3 mb-3">
//                     <div className="p-2 bg-white rounded-lg">
//                       {category.icon}
//                     </div>
//                     <span className="font-medium text-dark">{category.name}</span>
//                   </div>
                  
//                   <div className="flex gap-2">
//                     {renderStars(category.id, true)}
//                   </div>
                  
//                   <div className="mt-2 text-sm text-gray-500">
//                     {ratings[category.id] > 0 
//                       ? `You rated: ${ratings[category.id]} stars`
//                       : 'Click to rate'}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <motion.button
//               onClick={handleSubmit}
//               disabled={submitted || Object.values(ratings).every(r => r === 0)}
//               className={`w-full mt-8 py-3 rounded-full font-semibold transition-all ${
//                 submitted || Object.values(ratings).every(r => r === 0)
//                   ? 'bg-gray-300 cursor-not-allowed'
//                   : 'bg-primary text-white hover:bg-primary-light'
//               }`}
//               whileHover={
//                 !submitted && !Object.values(ratings).every(r => r === 0) 
//                   ? { scale: 1.02 } 
//                   : {}
//               }
//               whileTap={
//                 !submitted && !Object.values(ratings).every(r => r === 0) 
//                   ? { scale: 0.98 } 
//                   : {}
//               }
//             >
//               {submitted ? 'Thank You! ✓' : 'Submit Ratings'}
//             </motion.button>

//             {submitted && (
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="mt-4 text-center text-green-600"
//               >
//                 Thanks for your feedback! It helps us serve you better.
//               </motion.div>
//             )}
//           </motion.div>
//         </div>

//         {/* Stats */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
//         >
//           <div className="text-center">
//             <div className="text-3xl font-bold text-primary">4.7</div>
//             <div className="text-gray-600">Overall Rating</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold text-primary">330+</div>
//             <div className="text-gray-600">Total Ratings</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold text-primary">98%</div>
//             <div className="text-gray-600">Would Recommend</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold text-primary">4.9</div>
//             <div className="text-gray-600">Service Quality</div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Ratings;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, Coffee, Croissant, Utensils, Wine, Send, Sparkles, TrendingUp, Users, Award } from 'lucide-react';

const Ratings = () => {
  const [ratings, setRatings] = useState({
    coffee: 0,
    pastries: 0,
    food: 0,
    cocktails: 0
  });

  const [submitted, setSubmitted] = useState(false);
  const [hoveredStar, setHoveredStar] = useState({ category: null, value: 0 });

  const categories = [
    {
      id: 'coffee',
      name: 'Coffee',
      icon: <Coffee className="text-amber-600" size={24} />,
      currentRating: 4.7,
      totalRatings: 128,
      color: 'from-amber-500/20 to-orange-500/20',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'
    },
    {
      id: 'pastries',
      name: 'Pastries',
      icon: <Croissant className="text-amber-700" size={24} />,
      currentRating: 4.9,
      totalRatings: 96,
      color: 'from-yellow-500/20 to-amber-500/20',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      id: 'food',
      name: 'Food',
      icon: <Utensils className="text-emerald-600" size={24} />,
      currentRating: 4.5,
      totalRatings: 64,
      color: 'from-emerald-500/20 to-green-500/20',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      id: 'cocktails',
      name: 'Cocktails',
      icon: <Wine className="text-rose-600" size={24} />,
      currentRating: 4.8,
      totalRatings: 42,
      color: 'from-rose-500/20 to-pink-500/20',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200'
    }
  ];

  const handleStarClick = (category, value) => {
    setRatings(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Ratings submitted:', ratings);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setRatings({ coffee: 0, pastries: 0, food: 0, cocktails: 0 });
    }, 3000);
  };

  const renderStars = (category, interactive = false, size = 'md') => {
    const starSize = size === 'lg' ? 32 : size === 'sm' ? 16 : 24;
    const categoryData = categories.find(c => c.id === category);
    
    return [...Array(5)].map((_, index) => {
      const value = index + 1;
      const isFilled = interactive 
        ? value <= (hoveredStar.category === category ? hoveredStar.value : ratings[category])
        : value <= categoryData?.currentRating;

      return (
        <motion.button
          key={index}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && handleStarClick(category, value)}
          onMouseEnter={() => interactive && setHoveredStar({ category, value })}
          onMouseLeave={() => interactive && setHoveredStar({ category: null, value: 0 })}
          whileHover={interactive ? { scale: 1.2, rotate: 10 } : {}}
          whileTap={interactive ? { scale: 0.9 } : {}}
          className={interactive ? 'cursor-pointer' : 'cursor-default'}
        >
          <Star
            className={`transition-all duration-200 ${
              isFilled 
                ? 'text-yellow-500 fill-yellow-500 drop-shadow-sm' 
                : interactive 
                  ? 'text-gray-300 hover:text-yellow-300/50' 
                  : 'text-gray-200'
            }`}
            size={starSize}
          />
        </motion.button>
      );
    });
  };

  const totalUserRating = Object.values(ratings).reduce((a, b) => a + b, 0);
  const hasRated = totalUserRating > 0;

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full mb-6 shadow-lg">
            <Sparkles size={16} />
            <span className="text-sm font-medium">Community Ratings</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Share Your Taste
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Rate your favorites and help shape our menu
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Current Ratings Display */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ y: -4 }}
                className={`${category.bgColor} rounded-2xl p-6 border ${category.borderColor} shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} backdrop-blur-sm`}>
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex gap-1">
                          {renderStars(category.id, false, 'sm')}
                        </div>
                        <span className="text-sm text-gray-600">
                          ({category.totalRatings} ratings)
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {category.currentRating}
                      <span className="text-sm text-gray-500 font-normal">/5</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-emerald-600 font-medium">
                      <TrendingUp size={14} />
                      <span>Excellent</span>
                    </div>
                  </div>
                </div>
                
                {/* Rating Progress Bar */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Rating distribution</span>
                    <span>{category.currentRating} average</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(category.currentRating / 5) * 100}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={`h-full rounded-full bg-gradient-to-r ${category.color.split('/20')[0]}/60 ${category.color.split('/20')[1]}/60`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Rating Input Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
                <Star className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Your Ratings</h3>
                <p className="text-gray-600">How did we do today?</p>
              </div>
            </div>

            <div className="space-y-8 mb-8">
              {categories.map((category) => (
                <div key={category.id} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${category.bgColor}`}>
                        {category.icon}
                      </div>
                      <span className="font-semibold text-gray-900">{category.name}</span>
                    </div>
                    {ratings[category.id] > 0 && (
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                        {ratings[category.id]} stars
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-center gap-1">
                    {renderStars(category.id, true, 'lg')}
                  </div>
                  
                  <div className="mt-3 text-center">
                    <span className="text-sm text-gray-500">
                      {[1, 2, 3, 4, 5].map(num => (
                        <span
                          key={num}
                          className={`inline-block w-6 text-xs ${ratings[category.id] >= num ? 'text-amber-600 font-bold' : 'text-gray-400'}`}
                        >
                          {num}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Your overall rating</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {hasRated ? (totalUserRating / 4).toFixed(1) : '--'}/5
                    </div>
                  </div>
                  {hasRated && (
                    <div className="flex gap-1">
                      {renderStars('coffee', false, 'md')}
                    </div>
                  )}
                </div>
              </div>

              <motion.button
                onClick={handleSubmit}
                disabled={submitted || !hasRated}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                  submitted
                    ? 'bg-emerald-500 text-white cursor-default'
                    : hasRated
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 hover:shadow-2xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                } shadow-lg`}
                whileHover={
                  !submitted && hasRated 
                    ? { scale: 1.02, y: -2 } 
                    : {}
                }
                whileTap={
                  !submitted && hasRated 
                    ? { scale: 0.98 } 
                    : {}
                }
              >
                {submitted ? (
                  <>
                    <Sparkles size={20} />
                    Thank You For Your Feedback!
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Submit Your Ratings
                  </>
                )}
              </motion.button>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-center p-4 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200"
                >
                  <div className="flex items-center justify-center gap-2">
                    <ThumbsUp size={18} />
                    <span className="font-medium">Your feedback helps us improve!</span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 text-center border border-gray-200 shadow-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-xl mb-4">
                <Award className="text-amber-600" size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">4.7</div>
              <div className="text-gray-600 text-sm">Overall Rating</div>
            </div>
            
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 text-center border border-gray-200 shadow-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                <Users className="text-blue-600" size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">330+</div>
              <div className="text-gray-600 text-sm">Total Ratings</div>
            </div>
            
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 text-center border border-gray-200 shadow-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-xl mb-4">
                <ThumbsUp className="text-emerald-600" size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">98%</div>
              <div className="text-gray-600 text-sm">Would Recommend</div>
            </div>
            
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 text-center border border-gray-200 shadow-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-4">
                <TrendingUp className="text-purple-600" size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">4.9</div>
              <div className="text-gray-600 text-sm">Service Quality</div>
            </div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center max-w-2xl mx-auto"
        >
          <p className="text-gray-500 text-sm">
            Your ratings are anonymous and help us continuously improve our offerings. 
            We review feedback daily to ensure we're meeting your expectations.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Ratings;