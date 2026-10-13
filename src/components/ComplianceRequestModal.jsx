import React, { useState } from 'react';
import { X, Send, Loader2, FileCheck } from 'lucide-react';
import { notifyAdmin } from '../services/notifyAdmin';

const DOCUMENTS = [
  "Tax Clearance Certificate (ZRA)",
  "TPIN Certificate",
  "PACRA Certificate",
  "ZPPA Registration",
  "NAPSA Compliance",
  "Company Profile"
];

const EMPTY_FORM = {
  companyName: '',
  contactPerson: '',
  email: '',
  purpose: ''
};

const ComplianceRequestModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [formData, setFormData] = useState(EMPTY_FORM);

  if (!isOpen) return null;

  const toggleDoc = (doc) => {
    setSelectedDocs(prev =>
      prev.includes(doc)
        ? prev.filter(d => d !== doc)
        : [...prev, doc]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await notifyAdmin({
        event: "compliance_request",
        source: "website",
        timestamp: new Date().toISOString(),
        data: {
          ...formData,
          documents: selectedDocs
        }
      });

      alert("Compliance request sent successfully.");
      setFormData(EMPTY_FORM);
      setSelectedDocs([]);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to send request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={!isSubmitting ? onClose : null} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="bg-procure-navy p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Request Compliance Pack</h2>
            <p className="text-slate-300 text-sm">Gentlemans Resources Limited</p>
          </div>
          <button disabled={isSubmitting} onClick={onClose} className="p-2 rounded-full hover:bg-white/10">
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <input
            required
            placeholder="Company Name"
            className="w-full border rounded-lg p-3"
            value={formData.companyName}
            onChange={e => setFormData({ ...formData, companyName: e.target.value })}
          />

          <input
            required
            placeholder="Contact Person"
            className="w-full border rounded-lg p-3"
            value={formData.contactPerson}
            onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
          />

          <input
            required
            type="email"
            placeholder="Email Address"
            className="w-full border rounded-lg p-3"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />

          <textarea
            required
            rows={3}
            placeholder="Purpose (Tender, Vendor Onboarding, Due Diligence...)"
            className="w-full border rounded-lg p-3"
            value={formData.purpose}
            onChange={e => setFormData({ ...formData, purpose: e.target.value })}
          />

          <div>
            <p className="font-semibold text-sm mb-2">Documents Required</p>
            <div className="grid grid-cols-2 gap-2">
              {DOCUMENTS.map(doc => (
                <label key={doc} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedDocs.includes(doc)}
                    onChange={() => toggleDoc(doc)}
                  />
                  {doc}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-procure-copper text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : <FileCheck />}
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComplianceRequestModal;
