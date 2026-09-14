import React, { useState } from 'react';
import { RESEARCH_TOPICS } from '../data';
import { ResearchTopic } from '../types';
import { Microscope, ArrowUpRight, FlaskConical, Atom, Compass, ChevronRight, X } from 'lucide-react';

interface ResearchSectionProps {
  onOpenResearchPage?: () => void;
}

export const ResearchSection: React.FC<ResearchSectionProps> = ({ onOpenResearchPage }) => {
  const [activeTopic, setActiveTopic] = useState<ResearchTopic | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Intelligence', 'Robotics', 'Computing', 'Semiconductors', 'Health & Biology', 'Interaction'];

  const filteredTopics = filterCategory === 'All'
    ? RESEARCH_TOPICS
    : RESEARCH_TOPICS.filter((t) => t.category === filterCategory);

  return (
    <section id="research" className="py-24 sm:py-32 relative border-t border-white/5 bg-[#050608] tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded border border-white/10 bg-zinc-900/60 font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-4">
            <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
            <span>Foundational Discovery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
            Research before the roadmap.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-normal">
            We investigate technologies that may define the next decade — from intelligent machines and advanced computing to computational biology and human-centered technology. We prioritize difficult, foundational technical problems over short-term commercial trends.
          </p>
        </div>

        {/* Futuristic Research Lab Telemetry HUD */}
        <div className="mb-12 p-6 rounded-xl border border-white/10 bg-[#080a0f] relative overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
            <div className="px-3 py-2">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>LAB NODES ACTIVE</span>
              </div>
              <div className="text-xl font-mono font-bold text-white mt-1">09 Benches</div>
              <div className="text-xs text-zinc-400 mt-0.5">Autonomous &amp; Biophysical</div>
            </div>

            <div className="px-3 py-2">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                PRIMARY INQUISITIONS
              </div>
              <div className="text-xl font-mono font-bold text-cyan-300 mt-1">18 Vector Hypotheses</div>
              <div className="text-xs text-zinc-400 mt-0.5">Active falsification</div>
            </div>

            <div className="px-3 py-2">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                COMPUTE CAPACITY
              </div>
              <div className="text-xl font-mono font-bold text-indigo-300 mt-1">100Gbps Mesh</div>
              <div className="text-xs text-zinc-400 mt-0.5">Direct-to-die simulator</div>
            </div>

            <div className="px-3 py-2">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                TOLERANCE THRESHOLD
              </div>
              <div className="text-xl font-mono font-bold text-zinc-200 mt-1">Sub-Atomic / 0.015mm</div>
              <div className="text-xs text-zinc-400 mt-0.5">Cryo &amp; Optical Metrology</div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all border ${
                filterCategory === cat
                  ? 'bg-white/10 text-white border-white/30 shadow-sm'
                  : 'bg-zinc-900/40 text-zinc-500 border-white/5 hover:border-white/20 hover:text-zinc-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 9 Interactive Research Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic, idx) => (
            <div
              key={topic.id}
              id={`research-card-${topic.id}`}
              onClick={() => setActiveTopic(topic)}
              className="group cursor-pointer bg-[#08090e] hover:bg-[#0c0e14] border border-white/10 hover:border-cyan-500/40 rounded-xl p-6 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    RES // 0{RESEARCH_TOPICS.findIndex((t) => t.id === topic.id) + 1}
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10">
                    {topic.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {topic.title}
                </h3>

                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                  {topic.description}
                </p>
              </div>

              <div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-cyan-400/90 flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{topic.currentStatus}</span>
                  </span>
                  <span className="text-zinc-500 group-hover:text-cyan-400 transition-colors flex items-center text-xs font-mono">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Portfolio Trigger */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenResearchPage}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white font-mono text-xs uppercase tracking-wider transition-all"
          >
            <span>Open Comprehensive Research Portfolio (All 9 Programs)</span>
            <ChevronRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* Research Topic Inspection Modal */}
      {activeTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#090b10] border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setActiveTopic(null)}
              className="absolute top-6 right-6 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-3">
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">
                RESEARCH PROGRAM // {activeTopic.category}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{activeTopic.title}</h3>
            <div className="flex items-center space-x-4 text-xs font-mono text-zinc-400 mb-6 pb-4 border-b border-white/10">
              <span>FACILITY: {activeTopic.facility}</span>
              <span>•</span>
              <span className="text-cyan-300">STATUS: {activeTopic.currentStatus}</span>
            </div>

            <p className="text-zinc-300 text-sm leading-relaxed mb-6">
              {activeTopic.description}
            </p>

            {/* Core Research Questions */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                Fundamental Inquiries:
              </h4>
              <div className="space-y-3">
                {activeTopic.researchQuestions.map((q, idx) => (
                  <div key={idx} className="p-3 bg-zinc-950/80 rounded-lg border border-white/5 text-sm text-zinc-200 flex items-start space-x-2">
                    <span className="font-mono text-cyan-400 text-xs mt-0.5">Q0{idx + 1}:</span>
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Technologies */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                Coupled Technologies:
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeTopic.relatedTechnologies.map((tech, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-white/5 border border-white/10 font-mono text-xs text-zinc-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="font-mono text-xs text-zinc-500">GROUP: {activeTopic.investigationLead}</span>
              <button
                onClick={() => {
                  setActiveTopic(null);
                  if (onOpenResearchPage) onOpenResearchPage();
                }}
                className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-colors"
              >
                View in Full Portfolio →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
