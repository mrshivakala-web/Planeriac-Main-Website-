import React, { useState } from 'react';
import { TECHNOLOGIES } from '../data';
import { TechnologyArea } from '../types';
import { InteractiveMiniSim } from './InteractiveMiniSim';
import { ArrowRight, Cpu, Bot, Brain, Activity, CheckCircle2, X } from 'lucide-react';

const TECH_ICONS: Record<string, React.ReactNode> = {
  ai: <Brain className="w-5 h-5 text-cyan-400" />,
  robotics: <Bot className="w-5 h-5 text-emerald-400" />,
  computing: <Cpu className="w-5 h-5 text-indigo-400" />,
  biomedical: <Activity className="w-5 h-5 text-pink-400" />,
};

interface TechnologySectionProps {
  onNavigateToResearch?: () => void;
  onNavigateToProjects?: () => void;
}

export const TechnologySection: React.FC<TechnologySectionProps> = ({
  onNavigateToResearch,
  onNavigateToProjects,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeModalTech, setActiveModalTech] = useState<TechnologyArea | null>(null);

  return (
    <section id="technology" className="py-24 sm:py-32 relative border-t border-white/5 bg-[#07080c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded border border-white/10 bg-zinc-900/60 font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-4">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Core Technological Pillars</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              From algorithms to machines.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm sm:text-base text-zinc-400 max-w-md">
            Translating mathematical proofs, silicon abstractions, and biological code into physically validated systems.
          </p>
        </div>

        {/* 4 Technology Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {TECHNOLOGIES.map((tech, idx) => {
            const isHovered = hoveredId === tech.id;

            return (
              <div
                key={tech.id}
                id={`tech-card-${tech.id}`}
                onMouseEnter={() => setHoveredId(tech.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative bg-[#090b10] rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between overflow-hidden"
              >
                {/* Background technical corner marker */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/[0.03] to-transparent pointer-events-none" />

                <div>
                  {/* Card Header: Icon + Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      {TECH_ICONS[tech.id]}
                    </div>
                    <span className="font-mono text-xs text-zinc-500 tracking-wider">
                      MOD // 0{idx + 1}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors mb-2">
                    {tech.title}
                  </h3>
                  <div className="font-mono text-xs text-zinc-400 uppercase tracking-wide mb-4">
                    {tech.tagline}
                  </div>

                  {/* Description */}
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {tech.description}
                  </p>

                  {/* Interactive Micro-Simulation Visual */}
                  <div className="my-4">
                    <InteractiveMiniSim
                      type={tech.interactiveType}
                      active={isHovered}
                      className="h-28 sm:h-32 border-white/5"
                    />
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mt-2 px-1">
                      <span>INTERACTIVE TELEMETRY</span>
                      <span className={isHovered ? 'text-cyan-400' : 'text-zinc-600'}>
                        {isHovered ? 'LIVE SIMULATION ENGAGED' : 'HOVER TO ACTIVATE'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metrics & Explore Action */}
                <div className="mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    {tech.techMetrics.slice(0, 2).map((metric, mIdx) => (
                      <div key={mIdx}>
                        <div className="text-[10px] font-mono uppercase text-zinc-500">{metric.label}</div>
                        <div className="text-xs font-mono font-medium text-zinc-300">{metric.value}</div>
                      </div>
                    ))}
                  </div>

                  <button
                    id={`btn-explore-${tech.id}`}
                    onClick={() => setActiveModalTech(tech)}
                    className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-white hover:text-cyan-400 transition-colors py-1 group/btn self-start sm:self-auto"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Action Banner */}
        <div className="mt-12 p-6 rounded-xl border border-white/10 bg-zinc-950/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-zinc-400">
            Interested in specific mathematical models or engineering specifications?
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onNavigateToResearch}
              className="text-xs font-mono text-cyan-400 hover:underline uppercase tracking-wider"
            >
              Browse Research Laboratory →
            </button>
            <span className="text-zinc-700">|</span>
            <button
              onClick={onNavigateToProjects}
              className="text-xs font-mono text-zinc-300 hover:text-white uppercase tracking-wider"
            >
              View Active Projects →
            </button>
          </div>
        </div>
      </div>

      {/* Deep-Dive Exploration Modal */}
      {activeModalTech && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#0a0c12] border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
            <button
              id="close-tech-modal"
              onClick={() => setActiveModalTech(null)}
              className="absolute top-6 right-6 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                {TECH_ICONS[activeModalTech.id]}
              </div>
              <div>
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">
                  TECHNOLOGY PROFILE // {activeModalTech.id.toUpperCase()}
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight">{activeModalTech.title}</h3>
              </div>
            </div>

            <p className="text-zinc-300 text-sm leading-relaxed mb-6">
              {activeModalTech.description}
            </p>

            <div className="mb-6">
              <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-3">
                Core Architectural Vectors:
              </h4>
              <ul className="space-y-2.5">
                {activeModalTech.bulletPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 p-4 bg-zinc-900/60 rounded-lg border border-white/5 mb-6">
              {activeModalTech.techMetrics.map((m, idx) => (
                <div key={idx}>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">{m.label}</div>
                  <div className="text-sm font-mono font-semibold text-cyan-300">{m.value}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="font-mono text-xs text-zinc-500">STATUS: ACTIVE PRODUCTION R&amp;D</span>
              <button
                onClick={() => {
                  setActiveModalTech(null);
                  if (onNavigateToProjects) onNavigateToProjects();
                }}
                className="px-4 py-2 rounded bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs font-mono uppercase tracking-wider transition-colors"
              >
                Inspect Related Systems →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
