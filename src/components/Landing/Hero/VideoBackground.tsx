import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface VideoBackgroundProps {
  onLoadedData: () => void;
  isVideoLoaded: boolean;
  isMobile: boolean;
}

export const VideoBackground = ({ onLoadedData, isVideoLoaded, isMobile }: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSource = isMobile 
    ? '/videos/optimized/hero-mobile.mp4'
    : '/videos/optimized/hero.mp4';

  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    video.addEventListener('loadeddata', onLoadedData);
    video.load();
    return () => {
      video.removeEventListener('loadeddata', onLoadedData);
    };
  }, [onLoadedData]);

  return (
    <>
      <div className="absolute inset-0 w-full h-full overflow-hidden aspect-[21/9]">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute w-full h-full object-cover scale-[1.02] transition-opacity duration-1000
            ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isVideoLoaded ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-gradient-to-b from-luxury-900/80 via-luxury-900/60 to-luxury-900/80 backdrop-blur-[1px]"
      />
    </>
  );
};