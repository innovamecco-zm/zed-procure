import React, { useState } from 'react';
import { X, Send, Loader2, Paperclip, FileCheck } from 'lucide-react';
import { notifyAdmin } from "../services/notifyAdmin";

const QuoteModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Construction & Renovation',
    details: ''
  });

  if (!isOpen) return null;

  // Helper to convert file to Base64 for AppScript processing
  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]); // Strip the data:mime prefix
    reader.onerror = error => reject(error);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let filePayload = null;
      
      // If a file exists, prepare it for the request
      if (selectedFile) {
        filePayload = {
          base64: await toBase64(selectedFile),
          name: selectedFile.name,
          type: selectedFile.type
        };
      }

      await notifyAdmin({
        event: "quote_request",
        source: "website",
        timestamp: new Date().toISOString(),
        data: {
          ...formData,
          attachment: filePayload 
        }
      });

      alert("Success! Gentlemans Resources has received your request.");
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        service: 'Construction & Renovation',
        details: ''
      });
      setSelectedFile(null);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Could not submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={!isSubmitting ? onClose : null}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300 text-slate-900">
        <div className="bg-procure-navy p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Request a Quote</h2>
            <p className="text-slate-300 text-sm">Gentlemans Resources Limited</p>
          </div>
          <button 
            disabled={isSubmitting}
            onClick={onClose} 
            className="hover:bg-white/10 p-2 rounded-full transition-colors disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name / Company</label>
            <input 
              required
              disabled={isSubmitting}
              type="text" 
              className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-procure-copper outline-none transition disabled:bg-slate-50"
              placeholder="e.g. Daliso Banda or Innova tech Zambia"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
            <input 
              required
              disabled={isSubmitting}
              type="email" 
              className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-procure-copper outline-none transition disabled:bg-slate-50"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Service Required</label>
            <select 
              disabled={isSubmitting}
              className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-procure-copper outline-none bg-white disabled:bg-slate-50"
              value={formData.service}
              onChange={(e) => setFormData({...formData, service: e.target.value})}
            >
              <option>Construction & Renovation</option> 
              <option>Aluminium & Glass Works</option>
              <option>Corporate Branding</option>
              <option>Press Printing</option>
              <option>Industrial Parts & Consumables</option>
              <option>Haulage & Logistics</option>
              <option>ICT Equipment, Consumables and Software</option>
              <option>General Dealings</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Brief Description</label>
            <textarea 
              required
              disabled={isSubmitting}
              rows="3"
              className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-procure-copper outline-none transition disabled:bg-slate-50"
              placeholder="Tell us about your requirements..."
              value={formData.details}
              onChange={(e) => setFormData({...formData, details: e.target.value})}
            ></textarea>
          </div>

          {/* Attachment Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Attach Specification (Optional)
            </label>
            <div className={`relative border-2 border-dashed rounded-lg p-4 transition-colors ${selectedFile ? 'border-procure-copper bg-orange-50' : 'border-slate-200 hover:border-slate-300'}`}>
              <input 
                type="file"
                disabled={isSubmitting}
                accept=".pdf,.doc,.docx,image/*"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />
              <div className="flex items-center gap-3 text-slate-600">
                {selectedFile ? (
                  <>
                    <FileCheck className="text-procure-copper" size={20} />
                    <span className="text-sm font-medium truncate">{selectedFile.name}</span>
                  </>
                ) : (
                  <>
                    <Paperclip size={20} />
                    <span className="text-sm">Click to upload PDF or Image</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-procure-copper hover:bg-orange-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg mt-4 disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={18} /> Sending...
              </>
            ) : (
              <>
                <Send size={18} /> Submit Request
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuoteModal;