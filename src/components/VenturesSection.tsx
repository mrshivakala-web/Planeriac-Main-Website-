import React from 'react';
import { VENTURE_PILLARS } from '../data';
import { Rocket, Lightbulb, Hammer, TrendingUp, ArrowRight, ShieldCheck } from 'lucide-react';

const PILLAR_ICONS = [
  <Lightbulb className="w-5 h-5 text-cyan-400" />,
  <Hammer className="w-5 h-5 text-emerald-400" />,
  <TrendingUp className="w-5 h-5 text-indigo-400" />,
];

interface VenturesSectionProps {
  onNavigateToContact?: () => void;
}

export const VenturesSection: React.FC<VenturesSectionProps> = ({ onNavigateToContact }) => {
  return (
    <section id="ventures" className="py-24 sm:py-32 relative border-t border-white/5 bg-[#050608]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded border border-white/10 bg-zinc-900/60 font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-4">
            <Rocket className="w-3.5 h-3.5 text-cyan-400" />
            <span>Venture Studio &amp; Incubation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
            Ideas should become systems.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-normal">
            We explore promising technologies, develop prototypes, and work toward turning research into useful products and companies. We believe breakthroughs are realized only when proven at industrial scale.
          </p>
        </div>

        {/* 3 Categories Progression Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          {VENTURE_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.phase}
              id={`venture-phase-${pillar.phase}`}
              className="bg-[#080a10] border border-white/10 rounded-xl p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-300 relative group"
            >
              <div>
                {/* Phase Number + Icon */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                  <span className="font-mono text-xs font-bold text-zinc-500 tracking-wider">
                    PHASE // {pillar.phase}
                  </span>
                  <div className="p-2 rounded-md bg-white/5 border border-white/10">
                    {PILLAR_ICONS[idx]}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                  {pillar.name}
                </h3>
                <div className="font-mono text-xs text-zinc-400 uppercase tracking-wide mb-4">
                  {pillar.title}
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {pillar.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-2 pt-4 border-t border-white/5">
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-2">
                    Key Execution Outputs:
                  </span>
                  {pillar.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-center space-x-2 text-xs text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 font-mono text-[11px] text-zinc-500 flex items-center justify-between">
                <span>GATE // VERIFIED</span>
                <span className="text-zinc-400">STAGE {idx + 1}/3</span>
              </div>
            </div>
          ))}
        </div>

        {/* Co-founder / Partner CTA */}
        <div className="mt-12 p-8 rounded-xl border border-white/10 bg-gradient-to-r from-zinc-950 via-[#0a0d14] to-zinc-950 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold text-white mb-1">
              Are you building deep technology that requires capital, engineering or lab facilities?
            </h4>
            <p className="text-sm text-zinc-400">
              We partner with exceptional researchers, founders, and engineers to build frontier ventures.
            </p>
          </div>
          <button
            onClick={onNavigateToContact}
            className="shrink-0 px-5 py-2.5 rounded-lg bg-white hover:bg-zinc-200 text-black font-mono text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center space-x-2"
          >
            <span>Partner with Ventures</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
