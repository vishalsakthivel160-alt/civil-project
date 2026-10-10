import React from 'react';
import { HardHat, ArrowUp } from 'lucide-react';
import { SiteSettings } from '../api/client.js';

interface FooterProps {
  settings: SiteSettings | null;
  onNavigate: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#102230] text-[#bbc8d3] border-t border-[#263746]">
      {/* Upper Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#263746] flex items-center justify-center text-white border border-[#102230]">
                <HardHat className="w-5 h-5 text-[#fdad67]" />
              </div>
              <span className="font-display font-semibold text-lg text-white tracking-tight">
                TECTONIC <span className="text-[#B87333] font-light">PRECISION</span>
              </span>
            </div>
            <p className="font-body text-xs text-[#8ea0b2] max-w-sm leading-relaxed">
              Professional civil construction and structural building works. Operating with uncompromising structural integrity, exact engineering tolerances, and field command.
            </p>
            <div className="font-mono text-[11px] text-[#fdad67]">
              <span>STANDARDS: ASTM // ACI // EN-1992 EUROCODE</span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="subheading-tracked text-[#8ea0b2] text-[10px]">
              QUICK DIRECTORY
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('projects-completed')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Completed Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('projects-ongoing')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Active Ongoing Works</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B87333]"></span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Services & Scope
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('experience')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Professional Experience
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tender Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Field Office Details */}
          <div className="md:col-span-4 space-y-3">
            <div className="subheading-tracked text-[#8ea0b2] text-[10px]">
              ENGINEERING HEADQUARTERS
            </div>
            <div className="text-xs space-y-1.5 text-[#8ea0b2]">
              <p className="text-white font-medium">{settings?.business_name || 'Tectonic Precision Works'}</p>
              <p>{settings?.address || '450 Engineering Parkway, Suite 300, Metro Civil Hub'}</p>
              <p className="font-mono text-[#fdad67] pt-1">Tel: {settings?.phone || '+1 (555) 234-8901'}</p>
              <p className="font-mono">Email: {settings?.email || 'contact@tectonic-civilworks.com'}</p>
            </div>
          </div>

        </div>
      </div>

      {/* Hairline division rule */}
      <div className="border-t border-[#263746]/80 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#8ea0b2]">
          <div>
            © {new Date().getFullYear()} Tectonic Precision Civil Works. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>COORDINATES: 37°46'29.9"N 122°25'09.8"W</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#fdad67] hover:text-white transition-colors cursor-pointer"
            >
              <span>TOP</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
