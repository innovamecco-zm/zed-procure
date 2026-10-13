import React from 'react';
import { 
  Truck, 
  HardHat,
  Palette, 
  Printer, 
  Settings, 
  Droplets,
  Handshake, 
  SunMedium
} from 'lucide-react';

const services = [
  {
    title: "Construction & Renovation",
    description: "Specialized in Aluminium and glass works, tiling, and professional ceiling installations for corporate and industrial spaces.",
    icon: <HardHat className="w-8 h-8 text-procure-copper" />,
  },
  {
    title: "Corporate Branding & Signage",
    description: "Full-scale branding solutions including custom apparel design, billboard installation, and customized corporate signage.",
    icon: <Palette className="w-8 h-8 text-procure-copper" />,
  },
  {
    title: "Press & Printing Services",
    description: "High-volume professional printing of flyers, brochures, books, and marketing collateral with precision finishes.",
    icon: <Printer className="w-8 h-8 text-procure-copper" />,
  },
  {
    title: "Industrial Service Parts",
    description: "Reliable supply of mechanical and electrical parts, including dies, rolls, bearings, and industrial seals.",
    icon: <Settings className="w-8 h-8 text-procure-copper" />,
  },
  {
    title: "Industrial Consumables",
    description: "Sourcing of critical operational inputs like security seals, high-grade lubricants, and specialized chemical inputs.",
    icon: <Droplets className="w-8 h-8 text-procure-copper" />,
  },
   {
    title: "Solar & Green Energy Solutions",
    description: "Provision of solar panels, inverters, batteries, and complete off-grid solar systems for sustainable energy needs.",
    icon: <SunMedium className="w-8 h-8 text-procure-copper" />,
  },
  {
    title: "Industrial Haulage & Logistics",
    description: "Comprehensive contractual trucking and logistics featuring earth-moving equipment, cranes, and forklift hiring for heavy operations.",
    icon: <Truck className="w-8 h-8 text-procure-copper" />,
  },
  {
    title: "ICT & Office Equipment",
    description: "Provision of cutting-edge ICT solutions including computers, networking hardware, and office automation equipment.",
    icon: <Printer className="w-8 h-8 text-procure-copper" />,
  },
  {
    title: "General Dealing",
    description: "As a professional general dealer, we source a wide range of specialized items upon request to meet unique business needs.",
    // use hand shake icon from lucide-react
    icon: <Handshake className="w-8 h-8 text-procure-copper" />,
  },
];

const Services = () => {
  return (
    <section className="py-24 bg-slate-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-procure-copper font-bold tracking-widest uppercase text-sm mb-3">Our Expertise</h2>
          <p className="text-4xl font-extrabold text-procure-navy">Gentlemans Resources Services</p>
          <div className="w-20 h-1.5 bg-procure-copper mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="bg-slate-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-procure-navy transition-colors">
                 <div className="group-hover:text-white transition-colors">
                    {service.icon}
                 </div>
              </div>
              <h3 className="text-xl font-bold text-procure-navy mb-4">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        
        
        {/* Additional Note for General Dealing */}
        <div className="mt-16 text-center">
            <p className="text-slate-500 italic">
                Looking for something specific? As a <strong>Professional General Dealer</strong>, we source specialized items upon request.
            </p>
        </div>
      </div>
    </section>
  );
};

export default Services;