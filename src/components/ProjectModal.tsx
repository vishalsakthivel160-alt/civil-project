import React, { useState, useEffect } from 'react';
import { X, MapPin, Calendar, Layers, ShieldCheck, ChevronLeft, ChevronRight, CheckCircle2, Clock } from 'lucide-react';
import { Project } from '../api/client.js';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?q=80&w=1200&auto=format&fit=crop';

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const images = project.gallery_images && project.gallery_images.length > 0
    ? project.gallery_images
    : [project.cover_image || FALLBACK_IMAGE];

  const currentImage = images[activeImageIndex] || project.cover_image || FALLBACK_IMAGE;

  const isOngoing = project.status === 'Ongoing';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#102230]/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 lg:p-10">
      {/* Modal Dialog Container */}
      <div
        className="relative w-full max-w-4xl bg-white rounded-md border border-[#E2E8F0] elevation-level-3 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Beam */}
        <div className={`h-1.5 w-full ${isOngoing ? 'bg-[#B87333]' : 'bg-[#263746]'}`} />

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F3F5F7]">
          <div className="flex items-center gap-3">
            <span className="subheading-tracked text-[#263746]">
              PROJECT DOSSIER // {project.id}
            </span>
            <span className="hidden sm:inline text-xs text-[#66737D]">|</span>
            <span className="hidden sm:inline font-mono text-xs text-[#66737D] uppercase">
              {project.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-[#E2E8F0] text-[#102230] transition-colors cursor-pointer"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Main Photo Viewer */}
          <div className="relative h-80 sm:h-96 w-full bg-[#102230] rounded overflow-hidden border border-[#E2E8F0]">
            <img
              src={currentImage}
              alt={project.title}
              onError={(e) => {
                e.currentTarget.src = FALLBACK_IMAGE;
              }}
              className="w-full h-full object-cover"
            />

            {/* Navigation arrows if multiple images */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded bg-[#102230]/80 hover:bg-[#102230] text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-xs border border-white/20"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded bg-[#102230]/80 hover:bg-[#102230] text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-xs border border-white/20"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Counter indicator */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-[#102230]/80 text-white font-mono text-xs backdrop-blur-xs border border-white/20">
                  {activeImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          {/* Thumbnails Row if multiple */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-16 rounded overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-[#B87333] shadow-xs' : 'border-[#E2E8F0] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Metadata Grid & Title */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              {isOngoing ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[rgba(184,115,51,0.1)] text-[#B87333] border border-[#B87333]/30 font-mono text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  Status: Ongoing Site Execution
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[rgba(38,55,70,0.08)] text-[#263746] border border-[#263746]/20 font-mono text-xs font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Status: Successfully Completed & Handed Over
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#F3F5F7] text-[#1F2933] font-mono text-xs border border-[#E2E8F0]">
                <Calendar className="w-3.5 h-3.5 text-[#66737D]" />
                Execution Year: {project.year}
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#102230]">
              {project.title}
            </h2>

            <div className="flex items-center gap-2 text-sm text-[#66737D] mt-2">
              <MapPin className="w-4 h-4 text-[#B87333]" />
              <span>{project.location}</span>
            </div>
          </div>

          {/* Engineering Scope Description */}
          <div className="bg-[#F3F5F7]/70 p-5 rounded border border-[#E2E8F0] space-y-2">
            <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-[#102230] flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#B87333]" />
              Technical Scope & Execution Summary
            </h4>
            <p className="text-sm text-[#1F2933] leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>

          {/* Technical Specifications Schedule Table */}
          <div className="border border-[#E2E8F0] rounded overflow-hidden">
            <div className="px-4 py-2 bg-[#102230] text-white font-mono text-xs flex justify-between items-center">
              <span>SCHEDULE OF PARTICULARS</span>
              <span className="text-[#fdad67]">SPEC: ASTM / ACI COMPLIANT</span>
            </div>
            <div className="divide-y divide-[#E2E8F0] text-xs font-mono">
              <div className="px-4 py-2.5 flex justify-between bg-white">
                <span className="text-[#66737D]">Structural Classification</span>
                <span className="text-[#102230] font-semibold">{project.category}</span>
              </div>
              <div className="px-4 py-2.5 flex justify-between bg-[#F7F9FF]">
                <span className="text-[#66737D]">Site Coordinates / Zone</span>
                <span className="text-[#102230]">{project.location}</span>
              </div>
              <div className="px-4 py-2.5 flex justify-between bg-white">
                <span className="text-[#66737D]">Project ID</span>
                <span className="text-[#102230] font-semibold">{project.id}</span>
              </div>
              <div className="px-4 py-2.5 flex justify-between bg-[#F7F9FF]">
                <span className="text-[#66737D]">Superintendence Level</span>
                <span className="text-[#102230] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Resident Civil Engineer Command
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#F3F5F7] border-t border-[#E2E8F0] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-[#263746] hover:bg-[#102230] text-white text-xs font-display font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
