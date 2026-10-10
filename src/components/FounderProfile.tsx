import React from 'react';

export const FounderProfile: React.FC = () => {
  return (
    <section className="bg-white py-12 border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-center">
        <div className="flex items-center bg-white rounded border border-[#E2E8F0] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-5 sm:p-6 max-w-md w-full animate-in fade-in duration-1000">
          <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-full overflow-hidden border border-[#263746] mr-5">
            {/* Placeholder image from Unsplash to act as client photo */}
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop" 
              alt="Karthi M" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[10px] sm:text-xs font-mono font-semibold text-[#B87333] tracking-widest uppercase mb-0.5">
              Founder & CEO
            </span>
            <h3 className="font-display text-lg sm:text-xl font-semibold text-[#102230] tracking-tight">
              Karthi M
            </h3>
            <p className="font-body text-[#43474c] text-xs sm:text-sm mt-0.5">
              Civil Construction Professional
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
