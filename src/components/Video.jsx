import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const Video = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [player, setPlayer] = useState(null);
  const playerRef = useRef(null);
  
  const videoId = "vem5i6lmKaY"; // Just the video ID

  // Load YouTube IFrame API
  useEffect(() => {
    // Check if YouTube API is already loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new window.YT.Player(playerRef.current, {
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          mute: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1
        },
        events: {
          onReady: () => {
            setPlayer(newPlayer);
          },
          onStateChange: (event) => {
            // Update play/pause state based on YouTube player state
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else {
              setIsPlaying(false);
            }
          }
        }
      });
    };

    // If API is already loaded
    if (window.YT && window.YT.Player) {
      window.onYouTubeIframeAPIReady();
    }

    // Cleanup
    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, []);

  // Play/Pause handler
  const handlePlayPause = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Mute/Unmute handler
  const handleMuteToggle = () => {
    if (player) {
      if (isMuted) {
        player.unMute();
      } else {
        player.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-4">
            Experience The Atmosphere
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take a peek inside our cozy space and watch our baristas work their magic
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* YouTube Player Container */}
            <div className="relative pt-[56.25%] rounded-3xl overflow-hidden">
              <div
                ref={playerRef}
                className="absolute top-0 left-0 w-full h-full"
              />
              
              {/* Custom Controls Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none">
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <div className="flex items-center gap-4 pointer-events-auto">
                    <motion.button
                      onClick={handlePlayPause}
                      className="bg-primary text-white p-3 rounded-full hover:bg-primary-light transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </motion.button>
                    <motion.button
                      onClick={handleMuteToggle}
                      className="text-white hover:text-primary transition-colors"
                      whileHover={{ scale: 1.1 }}
                    >
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </motion.button>
                  </div>
                  {/* <div className="text-white text-sm pointer-events-auto">
                    <span className="bg-black/50 px-3 py-1 rounded-full">
                      Tour Video - 2:45
                    </span>
                  </div> */}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Video;















// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

// const Video = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(true);
//   const videoUrl = "https://www.youtube.com/embed/vem5i6lmKaY"; // Replace with actual video ID

//   return (
//     <section className="py-20 px-4 bg-white">
//       <div className="max-w-7xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-4">
//             Experience The Atmosphere
//           </h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Take a peek inside our cozy space and watch our baristas work their magic
//           </p>
//         </motion.div>

//         <div className="relative max-w-4xl mx-auto">
//           {/* Video Container */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//             className="relative rounded-3xl overflow-hidden shadow-2xl"
//           >
//             {/* YouTube Embed */}
//             <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
//               <iframe
//                 src={`${videoUrl}?autoplay=0&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&rel=0`}
//                 title="The Eleventh Hour Coffee Shop Tour"
//                 className="absolute top-0 left-0 w-full h-full"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               />
              
//               {/* Custom Controls Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent">
//                 <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <motion.button
//                       onClick={() => setIsPlaying(!isPlaying)}
//                       className="bg-primary text-white p-3 rounded-full hover:bg-primary-light transition-colors"
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                     >
//                       {isPlaying ? <Pause size={20} /> : <Play size={20} />}
//                     </motion.button>
//                     <motion.button
//                       onClick={() => setIsMuted(!isMuted)}
//                       className="text-white hover:text-primary transition-colors"
//                       whileHover={{ scale: 1.1 }}
//                     >
//                       {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
//                     </motion.button>
//                   </div>
//                   <div className="text-white text-sm">
//                     <span className="bg-black/50 px-3 py-1 rounded-full">
//                       Tour Video - 2:45
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Video Description */}
//           {/* <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.2 }}
//             className="mt-8 text-center"
//           >
//             <p className="text-lg text-gray-700 max-w-2xl mx-auto">
//               Watch as our expert baristas craft the perfect cup using locally 
//               sourced beans and traditional techniques. From bean to brew, 
//               every step is executed with precision and passion.
//             </p>
//             <div className="mt-6 flex flex-wrap justify-center gap-3">
//               <span className="px-4 py-2 bg-accent/30 rounded-full text-sm">
//                 ☕ Specialty Coffee
//               </span>
//               <span className="px-4 py-2 bg-accent/30 rounded-full text-sm">
//                 🎨 Latte Art
//               </span>
//               <span className="px-4 py-2 bg-accent/30 rounded-full text-sm">
//                 🏆 Award Winning
//               </span>
//               <span className="px-4 py-2 bg-accent/30 rounded-full text-sm">
//                 🌱 Sustainable
//               </span>
//             </div>
//           </motion.div> */}
//         </div>

//         {/* Additional Video Thumbnails */}
//         {/* <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
//         >
//           {[1, 2, 3, 4].map((item) => (
//             <motion.div
//               key={item}
//               whileHover={{ scale: 1.05, y: -5 }}
//               className="relative rounded-xl overflow-hidden cursor-pointer group"
//             >
//               <div className="aspect-video bg-gray-200" />
//               <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                 <Play className="text-white" size={24} />
//               </div>
//             </motion.div>
//           ))}
//         </motion.div> */}
//       </div>
//     </section>
//   );
// };

// export default Video;