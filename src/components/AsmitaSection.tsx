import React, { useState } from 'react';
import { ASMITA_TRACKS } from '../data';
import { AsmitaTrack } from '../types';
import { GraduationCap, ArrowRight, ArrowUpRight } from 'lucide-react';

interface AsmitaSectionProps {
  onExploreAsmita?: () => void;
}

export const AsmitaSection: React.FC<AsmitaSectionProps> = ({ onExploreAsmita }) => {
  const [selectedTrack, setSelectedTrack] = useState<AsmitaTrack>(ASMITA_TRACKS[0]);

  return (
    <section id="asmita" className="py-24 sm:py-32 relative border-t border-white/5 bg-[#07090e]">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 tech-grid opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded border border-amber-500/20 bg-amber-950/20 font-mono text-[11px] text-amber-400 uppercase tracking-wider mb-4">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Education Division // Asmita</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-2">
              Asmita
            </h2>
            <div className="text-lg sm:text-xl text-amber-200/90 font-light">
              Building the next generation of professionals and technologists.
            </div>
          </div>
          <p className="mt-4 md:mt-0 text-sm sm:text-base text-zinc-400 max-w-md">
            Asmita focuses on professional and technical education, combining structured learning with practical understanding.
          </p>
        </div>

        {/* 4 Specialized Tracks Selector */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {ASMITA_TRACKS.map((track) => {
            const isSelected = selectedTrack.code === track.code;
            return (
              <button
                key={track.code}
                id={`btn-asmita-${track.code.toLowerCase()}`}
                onClick={() => setSelectedTrack(track)}
                className={`p-5 rounded-xl text-left border transition-all duration-300 relative overflow-hidden ${
                  isSelected
                    ? 'bg-zinc-900 border-amber-400/60 shadow-lg shadow-amber-950/20'
                    : 'bg-zinc-950/60 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                    isSelected ? 'bg-amber-400/20 text-amber-300' : 'bg-white/5 text-zinc-400'
                  }`}>
                    {track.code}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase">PROGRAM</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                  {track.title}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-2">{track.subtitle}</p>

                {isSelected && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Track Detailed Blueprint Showcase */}
        <div className="bg-[#090c14] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Overview & Scope */}
            <div className="lg:col-span-6">
              <div className="flex items-center space-x-2 font-mono text-xs text-amber-400 uppercase tracking-widest mb-3">
                <span>CURRICULUM ARCHITECTURE // {selectedTrack.code}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                {selectedTrack.title}
              </h3>
              <div className="text-sm font-mono text-zinc-400 uppercase tracking-wide mb-6">
                {selectedTrack.subtitle}
              </div>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
                {selectedTrack.description}
              </p>

              <div className="p-4 rounded-lg bg-zinc-950/80 border border-amber-500/10 mb-6">
                <div className="font-mono text-xs text-amber-300 uppercase tracking-wider mb-1">
                  Primary Pedagogical Focus:
                </div>
                <div className="text-xs sm:text-sm text-zinc-300">{selectedTrack.focus}</div>
              </div>

              <a
                id="btn-explore-asmita-cta"
                href="https://mrshivakala-web.github.io/asmita/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onExploreAsmita}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <span>Explore Asmita</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Right: Core Modules Grid */}
            <div className="lg:col-span-6 bg-[#06070b] border border-white/5 rounded-xl p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 font-mono text-xs text-zinc-500">
                <span>SYLLABIC MODULES</span>
                <span>RIGOR LEVEL: ADVANCED</span>
              </div>

              <div className="space-y-3">
                {selectedTrack.modules.map((mod, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-3.5 rounded-lg bg-zinc-900/60 border border-white/5 flex items-start space-x-3"
                  >
                    <span className="font-mono text-xs text-amber-400 font-semibold mt-0.5">
                      0{mIdx + 1}.
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-zinc-200">{mod}</div>
                      <div className="text-xs text-zinc-500 font-mono mt-0.5">
                        First-principles case study &amp; problem sets
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>ACCREDITATION: NATIONAL BENCHMARKS</span>
                <span>SYNTHESIS: COMBINED THEORY &amp; LAB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
