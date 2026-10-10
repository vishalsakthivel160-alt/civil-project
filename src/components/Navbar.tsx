import React, { useState } from 'react';
import { HardHat, Phone, Menu, X, ArrowUpRight, Compass } from 'lucide-react';
import { SiteSettings } from '../api/client.js';

interface NavbarProps {
  settings: SiteSettings | null;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ settings, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E2E8F0]">
      {/* Top technical hairline bar */}
      <div className="bg-[#102230] text-[#8ea0b2] px-4 sm:px-8 py-1.5 text-xs border-b border-[#263746]">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-mono text-[11px]">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-[#fdad67]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B87333] animate-pulse"></span>
              CIVIL WORKS // ACTIVE
            </span>
            <span className="hidden md:inline text-[#66737D]">|</span>
            <span className="hidden md:inline text-[#bbc8d3]">DISPATCH: LICENSED RESIDENT ENGINEER</span>
          </div>
          <div className="flex items-center gap-4 text-[#bbc8d3]">
            {settings?.phone && (
              <a
                href={`tel:${settings.phone}`}
                className="hover:text-[#fdad67] transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3 h-3 text-[#B87333]" />
                <span>{settings.phone}</span>
              </a>
            )}
            <span className="hidden sm:inline text-[#43474c]">|</span>
            <span className="hidden sm:inline text-[#bbc8d3]">ISO 9001 / ASTM STANDARD</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
        {/* Brand identity */}
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 text-left group"
        >
          <div className="w-10 h-10 rounded bg-[#263746] flex items-center justify-center text-white border border-[#102230] group-hover:bg-[#102230] transition-colors shadow-sm">
            <HardHat className="w-5 h-5 text-[#fdad67]" />
          </div>
          <div>
            <div className="font-display font-semibold text-lg text-[#102230] tracking-tight flex items-center gap-1.5">
              TECTONIC <span className="text-[#B87333] font-light">PRECISION</span>
            </div>
            <div className="subheading-tracked text-[10px] text-[#66737D] -mt-0.5">
              CIVIL & STRUCTURAL WORKS
            </div>
          </div>
        </button>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#1F2933]">
          <button
            onClick={() => handleNavClick('projects-completed')}
            className="hover:text-[#B87333] transition-colors py-2 relative"
          >
            Completed Works
          </button>
          <button
            onClick={() => handleNavClick('projects-ongoing')}
            className="hover:text-[#B87333] transition-colors py-2 flex items-center gap-1.5"
          >
            <span>Ongoing Sites</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-[rgba(184,115,51,0.12)] text-[#B87333] font-mono font-semibold">
              LIVE
            </span>
          </button>
          <button
            onClick={() => handleNavClick('services')}
            className="hover:text-[#B87333] transition-colors py-2"
          >
            Services & Scope
          </button>
          <button
            onClick={() => handleNavClick('experience')}
            className="hover:text-[#B87333] transition-colors py-2"
          >
            Experience
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="hover:text-[#B87333] transition-colors py-2"
          >
            Contact
          </button>
        </nav>

        {/* Action Button */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => handleNavClick('contact')}
            className="px-4.5 py-2.5 rounded bg-[#263746] text-white hover:bg-[#102230] font-display text-xs font-semibold tracking-wider uppercase transition-all duration-150 border border-[#102230] elevation-level-2 flex items-center gap-2 group"
          >
            <span>Inquire / Request Tender</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#fdad67] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#102230] hover:bg-[#F3F5F7] rounded border border-[#E2E8F0]"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E2E8F0] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 font-medium text-sm text-[#1F2933]">
            <button
              onClick={() => handleNavClick('projects-completed')}
              className="text-left py-2 border-b border-[#E2E8F0]/60 flex items-center justify-between"
            >
              <span>Major Completed Works</span>
              <Compass className="w-4 h-4 text-[#66737D]" />
            </button>
            <button
              onClick={() => handleNavClick('projects-ongoing')}
              className="text-left py-2 border-b border-[#E2E8F0]/60 flex items-center justify-between"
            >
              <span>Current & Ongoing Sites</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(184,115,51,0.12)] text-[#B87333] font-mono">
                ACTIVE
              </span>
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className="text-left py-2 border-b border-[#E2E8F0]/60"
            >
              Services & Capabilities
            </button>
            <button
              onClick={() => handleNavClick('experience')}
              className="text-left py-2 border-b border-[#E2E8F0]/60"
            >
              Professional Field Experience
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 border-b border-[#E2E8F0]/60"
            >
              Site Contact & Inquiries
            </button>
          </div>
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-3 rounded bg-[#263746] text-white font-display text-xs font-semibold tracking-wider uppercase text-center block"
            >
              Inquire / Request Tender
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
