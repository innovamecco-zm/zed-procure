import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStart = useRef(null);
  const touchEnd = useRef(null);
  const imageCount = images?.length ?? 0;

  // Hooks must run before any early return
  useEffect(() => {
    if (imageCount === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imageCount);
    }, 5000);
    return () => clearInterval(timer);
  }, [imageCount]);

  // Safety check: if images aren't loading, show a placeholder
  if (imageCount === 0) {
    return (
      <div className="w-full h-full bg-slate-200 flex items-center justify-center rounded-3xl">
        <p className="text-slate-500 font-medium">No images provided</p>
      </div>
    );
  }

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  // Swipe logic for mobile/tablet users on desktop view
  const handleTouchStart = (e) => (touchStart.current = e.targetTouches[0].clientX);
  const handleTouchMove = (e) => (touchEnd.current = e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
  };

  return (
    <div 
      className="relative w-full h-full min-h-[300px] overflow-hidden rounded-3xl border border-slate-200 shadow-lg bg-slate-100"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Images Container */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img 
            src={img} 
            alt={`Slide ${index}`} 
            className="w-full h-full object-cover"
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      ))}

      {/* Navigation Arrows - Forced to z-20 */}
      <button 
        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg z-20 hover:bg-white transition-all hidden md:flex items-center justify-center text-procure-navy"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg z-20 hover:bg-white transition-all hidden md:flex items-center justify-center text-procure-navy"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators - Forced to z-20 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {images.map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2.5 rounded-full transition-all border border-black/5 shadow-sm ${
              i === currentIndex 
                ? 'w-8 bg-blue-600' // Using blue-600 for visibility; swap for your copper hex
                : 'w-2.5 bg-white/70 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;