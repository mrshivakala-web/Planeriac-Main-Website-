import React from 'react';
import { HeroVisual } from './HeroVisual';
import { ArrowRight, ChevronDown, Terminal, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onExploreWork: () => void;
  onAboutPlaneriac: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreWork, onAboutPlaneriac }) => {
  return (
    <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-28 overflow-hidden bg-[#050608]">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] radial-glow-cyan opacity-50 pointer-events-none" />
      <div className="absolute inset-0 tech-grid opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7">
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/10 bg-zinc-900/80 font-mono text-[11px] text-zinc-300 uppercase tracking-widest mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Deep Technology. Real-World Impact.</span>
            </div>

            {/* Large Editorial Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6">
              Engineering the technologies that shape what comes next.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg lg:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl mb-10">
              Planeriac builds intelligent systems at the intersection of AI, robotics, computing, health and education.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                id="hero-cta-explore"
                onClick={onExploreWork}
                className="px-8 py-3.5 rounded-lg bg-white hover:bg-zinc-200 text-black font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200 inline-flex items-center justify-center space-x-2 shadow-lg hover:shadow-cyan-500/10"
              >
                <span>Explore our work</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-cta-about"
                onClick={onAboutPlaneriac}
                className="px-8 py-3.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 text-zinc-200 hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-200 inline-flex items-center justify-center space-x-2"
              >
                <span>About Planeriac</span>
              </button>
            </div>

            {/* Micro Telemetry Indicator Bar */}
            <div className="mt-14 pt-8 border-t border-white/5 grid grid-cols-3 gap-4 font-mono text-[11px] text-zinc-500">
              <div>
                <span className="text-zinc-600 block">PARADIGM</span>
                <span className="text-zinc-300 font-medium">Multidisciplinary R&amp;D</span>
              </div>
              <div>
                <span className="text-zinc-600 block">TOLERANCE</span>
                <span className="text-zinc-300 font-medium">Sub-millimeter Physics</span>
              </div>
              <div>
                <span className="text-zinc-600 block">HORIZON</span>
                <span className="text-cyan-400 font-medium">Decadal Discovery</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Column */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <HeroVisual />
          </div>
        </div>
      </div>

      {/* Down indicator */}
      <div className="mt-12 text-center">
        <button
          onClick={onExploreWork}
          className="inline-flex items-center justify-center p-2 rounded-full border border-white/5 bg-white/[0.02] text-zinc-500 hover:text-white transition-colors"
          aria-label="Scroll to content"
        >
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
