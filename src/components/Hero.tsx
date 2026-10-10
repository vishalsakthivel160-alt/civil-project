import React from 'react';
import { ArrowRight, ShieldCheck, Ruler, Building, Compass } from 'lucide-react';
import { SiteSettings } from '../api/client.js';

interface HeroProps {
  settings: SiteSettings | null;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ settings, onContactClick }) => {
  return (
    <section id="hero" className="relative bg-[#f7f9ff] border-b border-[#E2E8F0] overflow-hidden">
      {/* Drafting grid background */}
      <div className="absolute inset-0 bg-drafting-grid opacity-60 pointer-events-none" />

      {/* Decorative hairline architectural boundary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading and Brief */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white border border-[#E2E8F0] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#B87333]"></span>
              <span className="subheading-tracked text-[#263746]">
                SECTION 01 // STRUCTURAL EXECUTION & CIVIL WORKS
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-semibold text-[#102230] leading-[1.12] tracking-tight">
              Tectonic Precision in Structural Concrete & Civil Infrastructure.
            </h1>

            <p className="font-body text-[#43474c] text-base sm:text-lg max-w-2xl leading-relaxed">
              {settings?.about_text ||
                'Dedicated to structural permanence, engineering exactness, and rigorous site execution. Specializing in commercial superstructures, deep foundation earth retention, heavy industrial facilities, and transport infrastructure.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onContactClick}
                className="px-6 py-3.5 rounded bg-white text-[#1F2933] hover:bg-[#F3F5F7] font-display text-sm font-semibold tracking-wider uppercase transition-all duration-150 border border-[#E2E8F0] flex items-center gap-2 cursor-pointer"
              >
                <span>Initiate Tender Inquiry</span>
              </button>
            </div>

            {/* Architectural specification ribbon */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#E2E8F0]">
              <div>
                <div className="label-technical text-[#66737D] text-[10px]">CORE METHODOLOGY</div>
                <div className="font-display font-semibold text-[#102230] text-sm mt-0.5">Post-Tensioned & Cast-In-Place</div>
              </div>
              <div>
                <div className="label-technical text-[#66737D] text-[10px]">STRUCTURAL SCOPE</div>
                <div className="font-display font-semibold text-[#102230] text-sm mt-0.5">Heavy Civil & Infrastructure</div>
              </div>
              <div>
                <div className="label-technical text-[#66737D] text-[10px]">QUALITY GOVERNANCE</div>
                <div className="font-display font-semibold text-[#102230] text-sm mt-0.5">Zero-Defect QA Protocols</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Architectural Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-white rounded-md border border-[#E2E8F0] elevation-level-2 overflow-hidden">
              {/* Top Accent Beam */}
              <div className="h-1 bg-[#B87333] w-full" />
              
              <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F3F5F7]/50">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#102230]"></span>
                  <span className="font-mono text-[11px] text-[#263746] font-medium uppercase tracking-wider">
                    SITE SPECIFICATION DOSSIER
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#66737D]">REF #CW-2026</span>
              </div>

              <div className="relative h-64 overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb1861593?q=80&w=1200&auto=format&fit=crop"
                  alt="Civil structural engineering site"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102230]/80 via-transparent to-transparent flex items-end p-5">
                  <div className="text-white">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#B87333] text-white uppercase font-medium">
                      ACTIVE METHODOLOGY
                    </span>
                    <h3 className="font-display text-lg font-semibold mt-1.5 leading-snug">
                      High-Precision Formwork & Core Wall Casting
                    </h3>
                  </div>
                </div>
              </div>

              {/* Specs Schedule */}
              <div className="p-5 space-y-3.5 bg-white text-xs">
                <div className="flex items-center justify-between pb-2.5 border-b border-[#E2E8F0]">
                  <span className="text-[#66737D] flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-[#B87333]" /> Tolerances
                  </span>
                  <span className="font-mono font-medium text-[#102230]">±2mm Laser Verified</span>
                </div>
                <div className="flex items-center justify-between pb-2.5 border-b border-[#E2E8F0]">
                  <span className="text-[#66737D] flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-[#B87333]" /> Primary Structures
                  </span>
                  <span className="font-mono font-medium text-[#102230]">C40/50 & High-Yield Steel</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#66737D] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B87333]" /> Safety Status
                  </span>
                  <span className="font-mono font-medium text-[#102230] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> 100% Incident Free
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
