import React, { useState } from 'react';
import ComplianceRequestModal from './ComplianceRequestModal';
import { CheckCircle, Shield, FileCheck } from 'lucide-react';

const certifications = [
  {
    agency: "PACRA",
    status: "Active & Registered",
    detail: "Full legal incorporation with the Patents and Companies Registration Agency.",
    color: "border-blue-600"
  },
  {
    agency: "ZRA",
    status: "Tax Compliant",
    detail: "Valid Tax Clearance Certificate (TCC) and TPIN registered for all business activities.",
    color: "border-green-600"
  },
  {
    agency: "ZPPA",
    status: "Certified Supplier",
    detail: "E-GP System registered and certified for participation in public tenders.",
    color: "border-orange-600"
  },
  {
    agency: "NAPSA",
    status: "Fully Compliant",
    detail: "Up-to-date with social security contributions for our local workforce.",
    color: "border-teal-600"
  },
  {
    agency: "NCC",
    status: "Registered Contractor",
    detail: "Registered with the National Council for Construction to undertake construction works.",
    color: "border-purple-600"
  },
  {
    agency: "NHIMA",
    status: "Fully Compliant",
    detail: "Up-to-date with National Health Insurance Management Authority contributions for our employees.",
    color: "border-rose-600"
  },
  {
    agency: "WCFCB",
    status: "Fully Compliant",
    detail: "Workers' Compensation Fund Control Board cover in place for our workforce.",
    color: "border-amber-600"
  }
];

const Compliance = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Reduced padding-top on mobile (py-12) to py-20 on desktop */}
      <section className="py-12 md:py-20 bg-white border-t border-slate-100 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section: Center text on mobile, left on desktop */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 md:mb-12 gap-8 text-center md:text-left">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-extrabold text-procure-navy mb-4">
                A Partner You Can <span className="text-procure-copper">Trust</span>
              </h2>
              <p className="text-slate-600 text-base md:text-lg">
                We operate with 100% transparency. Our company maintains full compliance with Zambian regulatory frameworks to ensure risk-free partnerships.
              </p>
            </div>
            
            {/* Verified Vendor Badge: Full width on mobile */}
            <div className="w-full md:w-auto bg-slate-50 p-5 rounded-2xl border border-slate-200 flex items-center justify-center md:justify-start gap-4 shadow-sm">
              <Shield className="text-procure-navy w-10 h-10 shrink-0" />
              <div className="text-left">
                <p className="font-bold text-procure-navy">Verified Vendor</p>
                <p className="text-xs text-slate-500 italic tracking-tight">Reg No: 46922</p>
              </div>
            </div>
          </div>

          {/* Grid: 1 column on mobile, 2 on tablet, 4 on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {certifications.map((cert, idx) => (
              <div key={idx} className={`bg-white border-t-4 ${cert.color} p-6 rounded-xl shadow-md hover:shadow-lg transition-all`}>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xl font-black text-slate-800">{cert.agency}</span>
                  <CheckCircle className="text-green-500 w-5 h-5 shrink-0" />
                </div>
                <p className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-1 rounded-md inline-block mb-3 uppercase tracking-wider">
                  {cert.status}
                </p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {cert.detail}
                </p>
              </div>
            ))}
          </div>
          
          {/* Call to Action Box: Responsive padding */}
          <div className="mt-12 md:mt-16 bg-procure-navy rounded-2xl md:rounded-3xl p-6 md:p-10 text-center text-white">
            <h3 className="text-xl md:text-2xl font-bold mb-3 italic leading-tight">
              Need our compliance documents for a bid?
            </h3>
            <p className="text-slate-300 text-sm md:text-base mb-6 md:mb-8 max-w-2xl mx-auto">
              Request our latest Tax Clearance, ZPPA Certificate, and Company Profile directly from our office.
            </p>

            <button
              onClick={() => setOpen(true)}
              className="w-full sm:w-auto bg-procure-copper hover:bg-orange-700 text-white font-bold py-4 px-10 rounded-full transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <FileCheck size={20} /> Request Compliance Pack
            </button>
          </div>
        </div>
      </section>

      <ComplianceRequestModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default Compliance;