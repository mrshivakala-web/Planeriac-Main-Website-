import React, { useState, useEffect } from 'react';
import { NavigationPage } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InterconnectedDomains } from './components/InterconnectedDomains';
import { TechnologySection } from './components/TechnologySection';
import { ResearchSection } from './components/ResearchSection';
import { SurgicalRoboticsShowcase } from './components/SurgicalRoboticsShowcase';
import { AsmithaSection } from './components/AsmithaSection';
import { VenturesSection } from './components/VenturesSection';
import { PhilosophySection } from './components/PhilosophySection';
import { ConvergenceSection } from './components/ConvergenceSection';
import { ContactSection } from './components/ContactSection';
import { AboutPage } from './components/AboutPage';
import { ResearchPage } from './components/ResearchPage';
import { ProjectsPage } from './components/ProjectsPage';
import { Footer } from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');

  // Smooth scroll helper
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavigate = (page: NavigationPage, sectionId?: string) => {
    if (page === 'home') {
      if (currentPage !== 'home') {
        setCurrentPage('home');
        if (sectionId) {
          setTimeout(() => scrollToSection(sectionId), 80);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (sectionId) {
        scrollToSection(sectionId);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050608] text-zinc-100 selection:bg-cyan-500/20 selection:text-cyan-200 antialiased font-sans">
      {/* Sticky Global Navigation */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Content Areas */}
      <main>
        {currentPage === 'home' && (
          <>
            {/* SECTION 1: HERO */}
            <HeroSection
              onExploreWork={() => scrollToSection('convergence-network')}
              onAboutPlaneriac={() => handleNavigate('about')}
            />

            {/* SECTION 2: WHAT IS PLANERIAC? (INTERCONNECTED DOMAINS) */}
            <InterconnectedDomains />

            {/* SECTION 3: OUR TECHNOLOGY */}
            <TechnologySection
              onNavigateToResearch={() => handleNavigate('research')}
              onNavigateToProjects={() => handleNavigate('projects')}
            />

            {/* SECTION 4: RESEARCH */}
            <ResearchSection
              onOpenResearchPage={() => handleNavigate('research')}
            />

            {/* SECTION 5: FEATURED PROJECT (SURGICAL ROBOTICS) */}
            <SurgicalRoboticsShowcase
              onViewResearch={() => handleNavigate('research')}
            />

            {/* SECTION 6: ASMITHA (EDUCATION DIVISION) */}
            <AsmithaSection
              onExploreAsmitha={() => scrollToSection('contact')}
            />

            {/* SECTION 7: VENTURES */}
            <VenturesSection
              onNavigateToContact={() => scrollToSection('contact')}
            />

            {/* SECTION 8: PHILOSOPHY */}
            <PhilosophySection />

            {/* SECTION 9: FUTURE (CONVERGENCE METAPHOR) */}
            <ConvergenceSection />

            {/* SECTION 10: CONTACT */}
            <ContactSection />
          </>
        )}

        {currentPage === 'about' && (
          <AboutPage
            onBackToHome={() => handleNavigate('home')}
            onNavigateToContact={() => handleNavigate('home', 'contact')}
          />
        )}

        {currentPage === 'research' && (
          <ResearchPage
            onBackToHome={() => handleNavigate('home')}
          />
        )}

        {currentPage === 'projects' && (
          <ProjectsPage
            onBackToHome={() => handleNavigate('home')}
            onNavigateToContact={() => handleNavigate('home', 'contact')}
          />
        )}
      </main>

      {/* Global Engineering Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
