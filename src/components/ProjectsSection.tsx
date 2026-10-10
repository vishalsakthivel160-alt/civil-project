import React, { useState } from 'react';
import { MapPin, Calendar, Layers, Eye, RefreshCw, AlertCircle, ArrowUpRight } from 'lucide-react';
import { Project } from '../api/client.js';

interface ProjectsSectionProps {
  projects: Project[];
  loading: boolean;
  error: string | null;
  onSelectProject: (project: Project) => void;
  onRetry: () => void;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?q=80&w=1200&auto=format&fit=crop';

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  loading,
  error,
  onSelectProject,
  onRetry,
}) => {
  const [activeTab, setActiveTab] = useState<'completed' | 'ongoing'>('completed');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const completedProjects = projects.filter((p) => p.status === 'Completed');
  const ongoingProjects = projects.filter((p) => p.status === 'Ongoing');

  const currentList = activeTab === 'completed' ? completedProjects : ongoingProjects;

  // Extract unique categories for current tab
  const categories = ['All', ...Array.from(new Set(currentList.map((p) => p.category)))];

  const filteredProjects = selectedCategory === 'All'
    ? currentList
    : currentList.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#E2E8F0]">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B87333]"></span>
              <span className="subheading-tracked text-[#66737D]">
                SECTION 02 // PORTFOLIO DOSSIER
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#102230] tracking-tight">
              Civil Works & Structural Projects
            </h2>
            <p className="font-body text-[#43474c] text-sm sm:text-base mt-2 max-w-xl">
              Comprehensive showcase of past executions and active worksites. Filtered dynamically by execution status and engineering typology.
            </p>
          </div>

          {/* Master Status Switcher: Completed vs Ongoing */}
          <div className="flex items-center p-1 bg-[#F3F5F7] rounded border border-[#E2E8F0] self-start md:self-auto">
            <button
              id="projects-completed"
              onClick={() => {
                setActiveTab('completed');
                setSelectedCategory('All');
              }}
              className={`px-4 py-2 rounded text-xs font-display font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'completed'
                  ? 'bg-[#263746] text-white shadow-xs'
                  : 'text-[#43474c] hover:text-[#102230]'
              }`}
            >
              <span>Completed Works</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  activeTab === 'completed' ? 'bg-[#102230] text-[#d2e4f8]' : 'bg-[#E2E8F0] text-[#66737D]'
                }`}
              >
                {completedProjects.length}
              </span>
            </button>

            <button
              id="projects-ongoing"
              onClick={() => {
                setActiveTab('ongoing');
                setSelectedCategory('All');
              }}
              className={`px-4 py-2 rounded text-xs font-display font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'ongoing'
                  ? 'bg-[#B87333] text-white shadow-xs'
                  : 'text-[#43474c] hover:text-[#102230]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-200 animate-pulse"></span>
              <span>Ongoing Works</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  activeTab === 'ongoing' ? 'bg-[#8c4f10] text-[#ffdcc2]' : 'bg-[#E2E8F0] text-[#66737D]'
                }`}
              >
                {ongoingProjects.length}
              </span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 py-6 border-b border-[#E2E8F0]/70">
          <span className="label-technical text-[#66737D] mr-2 text-[10px]">Filter Typology:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-[#102230] text-white border-[#102230]'
                  : 'bg-white text-[#43474c] border-[#E2E8F0] hover:bg-[#F3F5F7]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="border border-[#E2E8F0] rounded bg-white p-4 space-y-4 animate-pulse">
                <div className="h-48 bg-[#F3F5F7] rounded"></div>
                <div className="h-4 bg-[#F3F5F7] rounded w-3/4"></div>
                <div className="h-3 bg-[#F3F5F7] rounded w-1/2"></div>
                <div className="h-12 bg-[#F3F5F7] rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="my-12 p-8 border border-red-200 bg-red-50/50 rounded text-center space-y-4">
            <div className="inline-flex p-3 rounded-full bg-red-100 text-red-700">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-display font-semibold text-lg text-red-900">Failed to load projects from API</h3>
            <p className="text-sm text-red-700 max-w-md mx-auto">{error}</p>
            <button
              onClick={onRetry}
              className="px-4 py-2 rounded bg-[#263746] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#102230] transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Request</span>
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div className="py-20 border border-[#E2E8F0] bg-[#F3F5F7]/40 rounded text-center my-8 p-10 space-y-3">
            <div className="w-10 h-10 rounded bg-white border border-[#E2E8F0] flex items-center justify-center mx-auto text-[#66737D]">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-display font-semibold text-base text-[#102230]">No Projects Found in this Category</h4>
            <p className="text-xs text-[#66737D]">
              No active entries match {selectedCategory !== 'All' ? `"${selectedCategory}"` : 'the filter'}. Try switching categories.
            </p>
          </div>
        )}

        {/* Project Cards Grid */}
        {!loading && !error && filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
            {filteredProjects.map((project) => {
              const isOngoing = project.status === 'Ongoing';

              return (
                <div
                  key={project.id}
                  className="group bg-white rounded border border-[#E2E8F0] elevation-level-1 hover:elevation-level-2 transition-all duration-200 flex flex-col overflow-hidden"
                >
                  {/* Top Architectural Beam Accent */}
                  <div
                    className={`h-[2px] w-full ${isOngoing ? 'bg-[#B87333]' : 'bg-[#263746]'}`}
                  />

                  {/* Image Cover Container */}
                  <div className="relative h-56 bg-[#102230] overflow-hidden">
                    <img
                      src={project.cover_image || FALLBACK_IMAGE}
                      alt={project.title}
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_IMAGE;
                      }}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                    />

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      {isOngoing ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/95 backdrop-blur-xs text-[#B87333] border border-[#B87333]/30 text-[11px] font-mono font-semibold shadow-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B87333] animate-ping" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B87333] -ml-2.5" />
                          Ongoing Site
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/95 backdrop-blur-xs text-[#263746] border border-[#263746]/20 text-[11px] font-mono font-medium shadow-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#263746]" />
                          Completed
                        </span>
                      )}
                    </div>

                    {/* Gallery Images Counter Badge */}
                    {project.gallery_images && project.gallery_images.length > 0 && (
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-[#102230]/80 text-white font-mono text-[10px] backdrop-blur-xs border border-white/20">
                        {project.gallery_images.length} Photos
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Meta tag and Year */}
                      <div className="flex items-center justify-between text-xs text-[#66737D] font-mono mb-2">
                        <span className="label-technical text-[#B87333]">{project.category}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {project.year}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-semibold text-lg text-[#102230] leading-snug group-hover:text-[#B87333] transition-colors">
                        {project.title}
                      </h3>

                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-xs text-[#66737D] mt-2">
                        <MapPin className="w-3.5 h-3.5 text-[#B87333] shrink-0" />
                        <span className="truncate">{project.location}</span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#43474c] mt-3 line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-3 border-t border-[#E2E8F0]">
                      <button
                        onClick={() => onSelectProject(project)}
                        className="w-full py-2.5 px-3 rounded bg-[#F3F5F7] hover:bg-[#263746] text-[#102230] hover:text-white font-display text-xs font-semibold tracking-wider uppercase transition-colors border border-[#E2E8F0] flex items-center justify-center gap-2 cursor-pointer group/btn"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#B87333] group-hover/btn:text-white transition-colors" />
                        <span>Inspect Project & Gallery</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover/btn:opacity-100" />
                      </button>
                    </div>
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
