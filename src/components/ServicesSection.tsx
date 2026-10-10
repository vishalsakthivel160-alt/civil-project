import React from 'react';
import {
  Layers,
  Anchor,
  Truck,
  Building2,
  ShieldCheck,
  Wrench,
  Hammer,
  ArrowRight,
  LucideIcon
} from 'lucide-react';
import { Service } from '../api/client.js';

interface ServicesSectionProps {
  services: Service[];
  loading: boolean;
  onInquireService: () => void;
}

// Icon mapping dictionary
const iconMap: Record<string, LucideIcon> = {
  Layers,
  Anchor,
  Truck,
  Building2,
  ShieldCheck,
  Wrench,
  Hammer,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  loading,
  onInquireService,
}) => {
  return (
    <section id="services" className="py-20 bg-[#F3F5F7] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B87333]"></span>
            <span className="subheading-tracked text-[#66737D]">
              SECTION 03 // ENGINEERING CAPABILITIES
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#102230] tracking-tight">
            Specialized Civil & Structural Services
          </h2>
          <p className="font-body text-[#43474c] text-sm sm:text-base mt-2">
            Contractual execution and technical superintendence delivered strictly to engineering drawings, ASTM / EN standards, and structural load calculations.
          </p>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white p-6 rounded border border-[#E2E8F0] space-y-4 animate-pulse">
                <div className="w-10 h-10 bg-[#E2E8F0] rounded"></div>
                <div className="h-4 bg-[#E2E8F0] rounded w-2/3"></div>
                <div className="h-16 bg-[#E2E8F0] rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* Services Cards Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Hammer;

              return (
                <div
                  key={service.id}
                  className="bg-white rounded border border-[#E2E8F0] p-6 elevation-level-1 hover:elevation-level-2 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top indicator & icon */}
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E2E8F0]">
                      <div className="w-11 h-11 rounded bg-[#F3F5F7] text-[#263746] group-hover:bg-[#263746] group-hover:text-white transition-colors flex items-center justify-center border border-[#E2E8F0]">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs text-[#66737D] font-semibold">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-semibold text-lg text-[#102230] group-hover:text-[#B87333] transition-colors leading-snug">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="font-body text-xs text-[#43474c] mt-2.5 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Card bottom action */}
                  <div className="pt-5 mt-5 border-t border-[#E2E8F0]/70 flex items-center justify-between">
                    <span className="label-technical text-[#66737D] text-[10px]">
                      DIRECT EXECUTION
                    </span>
                    <button
                      onClick={onInquireService}
                      className="text-xs font-semibold text-[#263746] group-hover:text-[#B87333] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Inquire Scope</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
