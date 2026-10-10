import React, { useState, useEffect, useCallback } from 'react';
import {
  Project,
  Service,
  SiteSettings,
  fetchProjects,
  fetchServices,
  fetchSiteSettings,
} from './api/client.js';
import { Navbar } from './components/Navbar.js';
import { Hero } from './components/Hero.js';
import { ProjectsSection } from './components/ProjectsSection.js';
import { ProjectModal } from './components/ProjectModal.js';
import { ServicesSection } from './components/ServicesSection.js';
import { ExperienceSection } from './components/ExperienceSection.js';
import { FounderProfile } from './components/FounderProfile.js';
import { ContactSection } from './components/ContactSection.js';
import { Footer } from './components/Footer.js';

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingServices, setLoadingServices] = useState(true);
  const [projectError, setProjectError] = useState<string | null>(null);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Load all data from backend REST API
  const loadData = useCallback(async () => {
    // 1. Fetch Projects
    setLoadingProjects(true);
    setProjectError(null);
    try {
      const projs = await fetchProjects();
      setProjects(projs);
    } catch (err: any) {
      console.error('[App] Error loading projects:', err);
      setProjectError(err.message || 'Failed to load projects');
    } finally {
      setLoadingProjects(false);
    }

    // 2. Fetch Services
    setLoadingServices(true);
    try {
      const servs = await fetchServices();
      setServices(servs);
    } catch (err: any) {
      console.error('[App] Error loading services:', err);
    } finally {
      setLoadingServices(false);
    }

    // 3. Fetch Settings
    try {
      const sett = await fetchSiteSettings();
      setSettings(sett);
    } catch (err: any) {
      console.error('[App] Error loading site settings:', err);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const completedProjects = projects.filter((p) => p.status === 'Completed');
  const ongoingProjects = projects.filter((p) => p.status === 'Ongoing');

  // Smooth scroll helper
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9ff] text-[#121d26] selection:bg-[#fdad67] selection:text-[#102230]">
      {/* Navigation */}
      <Navbar settings={settings} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          settings={settings}
          onExploreProjects={() => handleNavigate('projects')}
          onContactClick={() => handleNavigate('contact')}
        />

        {/* Completed Works Section */}
        <ProjectsSection
          id="projects-completed"
          title="Completed Works"
          subtitle="Comprehensive showcase of successfully executed projects and architectural accomplishments."
          sectionNumber="02"
          badgeDotColor="bg-[#263746]"
          projects={completedProjects}
          loading={loadingProjects}
          error={projectError}
          onSelectProject={(project) => setSelectedProject(project)}
          onRetry={loadData}
          emptyMessage="No completed projects available yet."
        />

        {/* Ongoing Sites Section */}
        <ProjectsSection
          id="projects-ongoing"
          title="Ongoing Sites (Live)"
          subtitle="Currently active construction projects and sites currently undergoing execution."
          sectionNumber="02"
          badgeDotColor="bg-[#B87333] animate-pulse"
          projects={ongoingProjects}
          loading={loadingProjects}
          error={projectError}
          onSelectProject={(project) => setSelectedProject(project)}
          onRetry={loadData}
          emptyMessage="No ongoing projects available right now."
        />

        {/* Services & Capabilities */}
        <ServicesSection
          services={services}
          loading={loadingServices}
          onInquireService={() => handleNavigate('contact')}
        />

        {/* Professional Work Experience */}
        <ExperienceSection />

        {/* Founder Profile */}
        <FounderProfile />

        {/* Contact & Tender Inquiry Form */}
        <ContactSection settings={settings} />
      </main>

      {/* Footer */}
      <Footer settings={settings} onNavigate={handleNavigate} />

      {/* Project Detail Modal with Gallery */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
