"use client"

import React, { useEffect, useState, useRef } from 'react'
import { X, Play, Pause } from 'lucide-react'

const SplashVideo = () => {
  const [show, setShow] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 9000)
    
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setShow(false);
  }

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-999 bg-black flex items-center justify-center overflow-hidden">
      {/* Video Container */}
      <div className="relative w-full h-full group">
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover"
          onEnded={handleClose}
        >
          <source src="/kalpabriksh.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay - Bottom (for text visibility) */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />

        {/* Controls Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-between p-6">
          {/* Top Right - Close Button */}
          <div className="flex justify-end w-full">
            <button
              onClick={handleClose}
              className="relative p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-300 group/close"
              aria-label="Close video"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Center - Play/Pause */}
          <div className="flex gap-4">
            <button
              onClick={handlePlayPause}
              className="relative p-4 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-300 group/play hover:scale-110"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white fill-white" />
              ) : (
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              )}
            </button>
          </div>

          {/* Bottom - Info and Mute Button */}
          <div className="flex items-center justify-between w-full">
            <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h2 className="text-2xl md:text-4xl font-bold mb-2">Kalpabrikshya</h2>
              <p className="text-sm md:text-base text-white/80">Engineering Excellence & Innovation</p>
            </div>

            <button
              onClick={handleMute}
              className="relative p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-300 group/mute"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                {isMuted ? (
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                ) : (
                  <path d="M16.6915026,12.4744748 C16.6915026,11.1817848 15.6158496,10.1272231 14.2768283,10.1272231 C13.3625959,10.1272231 12.5814997,10.6571197 12.2050446,11.405 L11.6563168,11.405 C11.129147,11.405 10.8203822,11.8563632 10.8203822,12.4744748 C10.8203822,13.0925864 11.129147,13.5439496 11.6563168,13.5439496 L12.2050446,13.5439496 C12.5814997,14.2918299 13.3625959,14.8217265 14.2768283,14.8217265 C15.6158496,14.8217265 16.6915026,13.7671648 16.6915026,12.4744748 Z" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Skip to Main Content hint */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="text-white/40 text-center opacity-0 animate-pulse">
            <p className="text-sm">Video will close automatically</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SplashVideo