import React from 'react';
import { Briefcase, CheckCircle2, ChevronRight, ShieldCheck } from 'lucide-react';

interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  highlights: string[];
}

const professionalExperience: ExperienceItem[] = [
  {
    period: '2021 – Present',
    role: 'Lead Resident Civil Engineer & Project Superintendent',
    organization: 'Apex Civil Infrastructure Group',
    highlights: [
      'Site command over multi-tier commercial superstructures and municipal infrastructure packages exceeding $85M total value.',
      'Directed daily coordination of rebar fabrication, high-strength concrete delivery schedules, and tower crane logistics.',
      'Enforced zero-tolerance QA/QC inspection protocols, maintaining zero structural defect citations across all completed phases.',
    ],
  },
  {
    period: '2017 – 2021',
    role: 'Senior Structural Site Engineer',
    organization: 'Vanguard Industrial & Commercial Builders',
    highlights: [
      'Supervised cast-in-place concrete frameworks, deep secant retaining walls, and pre-engineered steel buildings.',
      'Formulated formwork stripping sequence models and concrete hydration temperature monitoring on mass concrete pours.',
      'Managed sub-contractor technical deliverables, structural shop drawing approvals, and RFI resolution on active sites.',
    ],
  },
  {
    period: '2014 – 2017',
    role: 'Site Civil Engineer & Quality Inspector',
    organization: 'Horizon Heavy Construction Ltd.',
    highlights: [
      'Executed site leveling surveys, structural piling load tests, soil compaction testing, and stormwater drainage installations.',
      'Coordinated daily concrete slump and compressive strength specimen logs in compliance with ASTM and EN standards.',
    ],
  },
];

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B87333]"></span>
            <span className="subheading-tracked text-[#66737D]">
              SECTION 04 // FIELD APPOINTMENTS
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#102230] tracking-tight">
            Professional Work Experience
          </h2>
          <p className="font-body text-[#43474c] text-sm sm:text-base mt-2">
            Verifiable track record of civil site superintendence, concrete structural execution, and high-stakes infrastructure delivery.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l-2 border-[#E2E8F0] ml-3 sm:ml-4 pl-6 sm:pl-10 space-y-12">
          {professionalExperience.map((item, index) => (
            <div key={index} className="relative group">
              
              {/* Precision Square/Diamond Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 bg-[#B87333] rotate-45 border-2 border-white shadow-xs group-hover:scale-125 transition-transform" />

              {/* Experience Card */}
              <div className="bg-white rounded border border-[#E2E8F0] p-6 elevation-level-1 hover:elevation-level-2 transition-all">
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-[#E2E8F0]">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded bg-[rgba(184,115,51,0.08)] text-[#B87333] font-mono text-xs font-semibold mb-1">
                      {item.period}
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-semibold text-[#102230]">
                      {item.role}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#66737D] self-start sm:self-auto">
                    <Briefcase className="w-3.5 h-3.5 text-[#B87333]" />
                    <span>{item.organization}</span>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#43474c]">
                  {item.highlights.map((highlight, hIndex) => (
                    <li key={hIndex} className="flex items-start gap-2.5 leading-relaxed">
                      <ChevronRight className="w-4 h-4 text-[#B87333] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

        {/* Quality Commitment Banner */}
        <div className="mt-14 p-6 rounded bg-[#F3F5F7] border border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#263746] text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#fdad67]" />
            </div>
            <div>
              <h4 className="font-display font-semibold text-sm text-[#102230]">
                Strict Adherence to Engineering Standards & Safety
              </h4>
              <p className="text-xs text-[#66737D] mt-0.5">
                Every project managed adheres to certified structural calculations, soil laboratory reports, and municipal building codes.
              </p>
            </div>
          </div>
          <span className="font-mono text-xs text-[#263746] font-semibold border border-[#E2E8F0] bg-white px-3 py-1.5 rounded shrink-0">
            FIELD LOGS VERIFIED
          </span>
        </div>

      </div>
    </section>
  );
};
