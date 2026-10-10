import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { SiteSettings, submitContact } from '../api/client.js';

interface ContactSectionProps {
  settings: SiteSettings | null;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successResponse, setSuccessResponse] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessResponse(null);

    // 1. Client-side validation: Name
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMessage('Please enter a valid full name (minimum 2 characters).');
      return;
    }

    // 2. Client-side validation: Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // 3. Client-side validation: Phone if provided
    if (formData.phone.trim()) {
      const phoneRegex = /^[\d\s+\-().]{6,30}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        setErrorMessage('Please enter a valid phone number or leave blank.');
        return;
      }
    }

    // 4. Client-side validation: Message
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setErrorMessage('Please describe your project scope or message (minimum 5 characters).');
      return;
    }

    try {
      setLoading(true);
      const result = await submitContact({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        message: formData.message.trim(),
      });

      setSuccessResponse(
        result.message || 'Thank you for your inquiry. Your message has been received and our engineering team will respond shortly.'
      );
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappLink = settings?.whatsapp
    ? `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`
    : null;

  return (
    <section id="contact" className="py-20 bg-[#F3F5F7] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B87333]"></span>
            <span className="subheading-tracked text-[#66737D]">
              SECTION 05 // SITE DIRECTORY & TENDER INQUIRY
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#102230] tracking-tight">
            Consultation & Project Inquiries
          </h2>
          <p className="font-body text-[#43474c] text-sm sm:text-base mt-2">
            Submit architectural drawings, tender packages, or site consultation requests directly to our civil engineering desk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded border border-[#E2E8F0] p-6 elevation-level-1 space-y-6">
              <div className="border-b border-[#E2E8F0] pb-4">
                <span className="subheading-tracked text-[#66737D]">CIVIL ENGINEERING OFFICE</span>
                <h3 className="font-display font-semibold text-lg text-[#102230] mt-1">
                  {settings?.business_name || 'Tectonic Precision Civil Works'}
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Office Location */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-[#F3F5F7] text-[#263746] flex items-center justify-center shrink-0 border border-[#E2E8F0]">
                    <MapPin className="w-4 h-4 text-[#B87333]" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-[#66737D] uppercase">Office Address</div>
                    <div className="font-medium text-[#102230] mt-0.5 leading-snug">
                      {settings?.address || '450 Engineering Parkway, Suite 300, Metro Civil Hub'}
                    </div>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-[#F3F5F7] text-[#263746] flex items-center justify-center shrink-0 border border-[#E2E8F0]">
                    <Phone className="w-4 h-4 text-[#B87333]" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-[#66737D] uppercase">Direct Field Telephone</div>
                    <a
                      href={`tel:${settings?.phone || '+15552348901'}`}
                      className="font-mono font-medium text-[#102230] hover:text-[#B87333] mt-0.5 block transition-colors"
                    >
                      {settings?.phone || '+1 (555) 234-8901'}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-[#F3F5F7] text-[#263746] flex items-center justify-center shrink-0 border border-[#E2E8F0]">
                    <Mail className="w-4 h-4 text-[#B87333]" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-[#66737D] uppercase">Official Inquiries Email</div>
                    <a
                      href={`mailto:${settings?.email || 'contact@tectonic-civilworks.com'}`}
                      className="font-mono font-medium text-[#102230] hover:text-[#B87333] mt-0.5 block transition-colors"
                    >
                      {settings?.email || 'contact@tectonic-civilworks.com'}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                {whatsappLink && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-[#F3F5F7] text-[#263746] flex items-center justify-center shrink-0 border border-[#E2E8F0]">
                      <MessageSquare className="w-4 h-4 text-[#B87333]" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-[#66737D] uppercase">Instant WhatsApp Dispatch</div>
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono font-medium text-[#102230] hover:text-[#B87333] mt-0.5 flex items-center gap-1 transition-colors"
                      >
                        <span>Chat via WhatsApp</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#B87333]" />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Operating Hours Note */}
              <div className="pt-4 border-t border-[#E2E8F0] flex items-center gap-2 text-xs text-[#66737D]">
                <Clock className="w-4 h-4 text-[#263746]" />
                <span>Site Dispatch Hours: Monday – Saturday (07:00 – 18:00)</span>
              </div>
            </div>

            {/* Tectonic Notice */}
            <div className="p-4 rounded bg-[#E4EFFD]/50 border border-[#c4c7cc]/40 text-xs text-[#43474c] space-y-1">
              <span className="font-mono font-semibold text-[#102230]">TENDER CONFIDENTIALITY GUARANTEE:</span>
              <p>
                All structural drawings, bills of quantities (BOQ), and project specifications submitted are held strictly confidential.
              </p>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded border border-[#E2E8F0] p-6 sm:p-8 elevation-level-1 relative">
              <div className="h-1 bg-[#263746] absolute top-0 left-0 right-0 rounded-t" />

              <div className="border-b border-[#E2E8F0] pb-4 mb-6">
                <span className="subheading-tracked text-[#263746]">TRANSMISSION PROTOCOL</span>
                <h3 className="font-display font-semibold text-xl text-[#102230] mt-1">
                  Send Project Inquiry / Tender Request
                </h3>
              </div>

              {/* Success State */}
              {successResponse && (
                <div className="mb-6 p-6 rounded bg-[#F7F9FF] border border-[#B87333]/30 space-y-3 animate-in fade-in">
                  <div className="flex items-center gap-2.5 text-[#263746]">
                    <CheckCircle2 className="w-5 h-5 text-[#B87333]" />
                    <span className="font-display font-semibold text-base">Inquiry Transmitted Successfully</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#43474c] leading-relaxed">
                    {successResponse}
                  </p>
                  <button
                    onClick={() => setSuccessResponse(null)}
                    className="text-xs font-mono font-medium text-[#B87333] hover:underline cursor-pointer pt-2 inline-block"
                  >
                    Submit another inquiry →
                  </button>
                </div>
              )}

              {/* Error State */}
              {errorMessage && (
                <div className="mb-6 p-4 rounded bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-xs sm:text-sm">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Validation Error:</span>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}

              {/* The Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1F2933] uppercase font-mono tracking-wider mb-1.5">
                      Full Name / Contact Person *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Jonathan Vance, PE"
                      required
                      className="w-full px-3.5 py-2.5 rounded bg-white border border-[#E2E8F0] focus:border-[#263746] focus:ring-1 focus:ring-[#B87333] text-sm text-[#1F2933] placeholder-[#66737D] outline-hidden transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1F2933] uppercase font-mono tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g., j.vance@engineering-firm.com"
                      required
                      className="w-full px-3.5 py-2.5 rounded bg-white border border-[#E2E8F0] focus:border-[#263746] focus:ring-1 focus:ring-[#B87333] text-sm text-[#1F2933] placeholder-[#66737D] outline-hidden transition-all"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-[#1F2933] uppercase font-mono tracking-wider mb-1.5">
                    Phone / Mobile (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded bg-white border border-[#E2E8F0] focus:border-[#263746] focus:ring-1 focus:ring-[#B87333] text-sm text-[#1F2933] placeholder-[#66737D] outline-hidden transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-[#1F2933] uppercase font-mono tracking-wider mb-1.5">
                    Project Scope / Message Description *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details on project location, structural typology, expected timeline, or tender documentation..."
                    required
                    className="w-full px-3.5 py-2.5 rounded bg-white border border-[#E2E8F0] focus:border-[#263746] focus:ring-1 focus:ring-[#B87333] text-sm text-[#1F2933] placeholder-[#66737D] outline-hidden transition-all resize-y"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-7 py-3 rounded bg-[#263746] hover:bg-[#102230] text-white font-display text-xs font-semibold tracking-wider uppercase transition-all duration-150 border border-[#102230] elevation-level-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Dossier...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Inquiry</span>
                        <Send className="w-3.5 h-3.5 text-[#fdad67]" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
