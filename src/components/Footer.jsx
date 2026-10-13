import React, { useState } from 'react'; // Added useState
import { Mail, Phone, MapPin, Facebook, X } from 'lucide-react'; // Added X for close icon
import PrivacyPolicy from '../pages/PrivacyPolicy.jsx'; // Updated import to use as component

const Footer = () => {
  // 1. State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  const companyName = import.meta.env.VITE_COMPANY_NAME;
  const companyPhone = import.meta.env.VITE_COMPANY_PHONE;
  const companyEmail = import.meta.env.VITE_COMPANY_EMAIL;
  const companyAddress = import.meta.env.VITE_COMPANY_ADDRESS;
  const facebookUrl = import.meta.env.VITE_FACEBOOK_URL;

  return (
    <footer className="bg-procure-navy text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 border-b border-slate-700 pb-12">
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-2xl font-bold mb-4">
            Gentlemans<span className="text-procure-copper"> Resources LTD</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Your trusted partner in strategic sourcing, logistics, and supply chain compliance across Zambia.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold mb-6 text-lg">Quick Links</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><a href="#services" className="hover:text-procure-copper transition">Our Services</a></li>
            <li><a href="#compliance" className="hover:text-procure-copper transition">Compliance Documents</a></li>
            {/* <li><a href="#Vendor" className="hover:text-procure-copper transition">Vendor Registration</a></li> */}
            
            {/* 2. Changed <a> to <button> for the popup trigger */}
            <li>
              <button 
                onClick={() => setIsModalOpen(true)} 
                className="hover:text-procure-copper transition text-left"
              >
                Privacy Policy
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-bold mb-6 text-lg">Contact Us</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-procure-copper" />
              <span>{companyAddress}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-procure-copper" />
              <span>{companyPhone}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-procure-copper" />
              <span>{companyEmail}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-lg">Follow Us</h4>
          <div className="flex gap-4 mb-6">
            <a href={facebookUrl} className="bg-slate-800 p-3 rounded-full hover:bg-procure-copper transition"><Facebook size={20} /></a>
          </div>
          <p className="text-xs text-slate-500 italic">Registered in the Republic of Zambia</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs">
        <p>© 2026 {companyName}. All rights reserved.</p>
        <p>A member of the Zambia Public Procurement Authority (ZPPA)</p>
      </div>

      {/* 3. Modal Logic */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative bg-white text-slate-900 w-full max-w-4xl max-h-[80vh] overflow-y-auto rounded-xl shadow-2xl p-8">
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition"
            >
              <X size={24} />
            </button>
            
            {/* The actual Privacy Policy content */}
            <PrivacyPolicy />
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;