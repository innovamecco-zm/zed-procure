import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import ImageSlider from './ImageSlider.jsx';
import MobileImageSlider from './MobileImageSlider.jsx';
import { getHeroSliderImages } from '../utils/imageLoader.js';

const Hero = () => {
  // Client-only app, so window and the bundled images are available on first render
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [sliderImages] = useState(getHeroSliderImages);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="relative pt-0 pb-12 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-10 md:gap-12">
        
        {/* Text Content */}
        <div className="flex-1 space-y-6 md:space-y-8 text-center md:text-left order-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border border-blue-100">
            <ShieldCheck size={16} /> ZPPA & ZRA Compliant
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-procure-navy leading-[1.1]">
            Strategic Sourcing for <br className="hidden sm:block" />
            <span className="text-procure-copper">Zambian Industry.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-procure-slate max-w-lg mx-auto md:mx-0">
            Optimizing supply chains across Lusaka, the Copperbelt, and beyond.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#projects" className="bg-procure-navy text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all">
              View Projects
            </a>
          </div>
        </div>

        {/* The Slider Section */}
        <div className="flex-1 w-full min-h-[300px] sm:min-h-[400px] relative order-2">
           {/* Logic to switch between sliders */}
           {isMobile ? (
             <MobileImageSlider images={sliderImages} />
           ) : (
             <ImageSlider images={sliderImages} />
           )}
           
           {/* Floating Badge */}
           <div className="absolute -bottom-4 right-4 sm:-left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-10">
              <p className="text-2xl font-bold text-procure-navy">100%</p>
              <p className="text-xs text-procure-slate font-medium">Timely Quality Always</p>
           </div>
        </div>
        
      </div>
    </header>
  );
};

export default Hero;