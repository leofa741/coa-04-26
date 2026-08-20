"use client";

import { motion } from "framer-motion";
import { Play, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";

interface VerticalVideoCardProps {
  src: string;
  poster?: string;
  title: string;
  description?: string;
  index?: number;
}

export default function VerticalVideoCard({
  src,
  poster,
  title,
  description,
  index = 0,
}: VerticalVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que el hover se desactive al hacer clic
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-dark-700 border border-white/5 hover:border-brand-500/30 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-[0_10px_40px_-15px_rgba(212,180,131,0.15)]"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Overlay Gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Play Icon Indicator (when paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-brand-500/20 backdrop-blur-sm border border-brand-500/50 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <Play className="w-7 h-7 text-brand-300 fill-brand-300 ml-1" />
          </div>
        </div>
      )}

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-brand-500/20 hover:border-brand-500/50 transition-all"
        aria-label={isMuted ? "Activar sonido" : "Silenciar"}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-white" />
        ) : (
          <Volume2 className="w-4 h-4 text-brand-300" />
        )}
      </button>

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <h3 className="text-xl font-serif text-white mb-1 drop-shadow-md">
          {title}
        </h3>
        {description && (
          <p className="text-gray-300 text-sm leading-relaxed drop-shadow-md line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}