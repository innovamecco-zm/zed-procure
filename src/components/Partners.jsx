import React from 'react';

// Import your client/partner logos
import client1 from '../assets/tiger.png';
import client2 from '../assets/pspf.jpeg';
import client3 from '../assets/Coat_of_arms_of_Zambia.png';
import client4 from '../assets/EC-LOGO.png';
import client5 from '../assets/RDA.png';
import client6 from '../assets/tobacco.jpeg';
import client7 from '../assets/zesco.png';

const partners = [
  { name: "Tiger", logo: client1 },
  { name: "PSPF", logo: client2 },
  { name: "GRZ institutions", logo: client3 },
  { name: "Emoluments Commission", logo: client4 },
  { name: "Road Development Agency", logo: client5 },
  { name: "Tobacco Board", logo: client6 },
  { name: "ZESCO", logo: client7 },
];

const Partners = () => {
  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-slate-400 font-bold uppercase text-xs tracking-[0.3em] mb-12">
          Trusted Industry Partners
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20">
          {partners.map((p, i) => (
            <div 
              key={i} 
              className="group relative flex items-center justify-center"
            >
              <img 
                src={p.logo} 
                alt={p.name} 
                className="h-10 md:h-14 w-auto object-contain opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
              />
              {/* Tooltip on hover */}
              <span className="absolute -top-8 scale-0 group-hover:scale-100 transition-all bg-procure-navy text-white text-[10px] py-1 px-2 rounded font-bold uppercase tracking-wider">
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;