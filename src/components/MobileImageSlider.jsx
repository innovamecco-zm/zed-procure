import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { withSlideLoaded } from '../utils/imageLoader.js';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const MobileImageSlider = ({ images }) => {
  // Slides whose image may be downloaded; starts with the first two
  const [loaded, setLoaded] = useState(() => new Set([0, 1]));

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade" // Smooth transition for mobile
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) =>
          setLoaded((prev) => withSlideLoaded(prev, swiper.activeIndex, images.length))
        }
        className="w-full h-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[300px] sm:h-[400px]">
              {loaded.has(index) && (
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  decoding="async"
                />
              )}
              {/* Subtle overlay to make the floating badge pop */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom CSS for Pagination Dots */}
      {/* <style jsx global>{`
        .swiper-pagination-bullet-active {
          background: #your-navy-color-code !important; 
        }
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
        }
      `}</style> */}
      {/* Use quotes or a string template to satisfy the React prop check */}
<style jsx="true" global="true">{`
  .swiper-pagination-bullet-active {
    background: #001f3f !important; /* Replace with your navy hex */
  }
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
  }
`}</style>
    </div>
  );
};

export default MobileImageSlider;