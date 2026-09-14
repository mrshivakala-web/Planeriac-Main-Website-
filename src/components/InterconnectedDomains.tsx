import React, { useState } from 'react';
import { DOMAINS } from '../data';
import { DomainNode } from '../types';
import { Cpu, Bot, Brain, Activity, GraduationCap, ArrowUpRight, Network } from 'lucide-react';

const ICONS: Record<string, React.ReactNode> = {
  ai: <Brain className="w-5 h-5" />,
  computing: <Cpu className="w-5 h-5" />,
  robotics: <Bot className="w-5 h-5" />,
  health: <Activity className="w-5 h-5" />,
  education: <GraduationCap className="w-5 h-5" />,
};

// Node coordinates in a circular pentagon layout
const PENTAGON_COORDS = [
  { x: 50, y: 15 },  // Top: AI
  { x: 85, y: 42 },  // Top right: Computing
  { x: 72, y: 84 },  // Bottom right: Robotics
  { x: 28, y: 84 },  // Bottom left: Health
  { x: 15, y: 42 },  // Top left: Education
];

export const InterconnectedDomains: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('ai');

  const activeDomain = DOMAINS.find((d) => d.id === selectedId) || DOMAINS[0];

  return (
    <section id="convergence-network" className="py-24 sm:py-32 relative border-t border-white/5 tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded border border-white/10 bg-zinc-900/60 font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-4">
            <Network className="w-3.5 h-3.5 text-cyan-400" />
            <span>Multidisciplinary Topology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
            Technology is converging. <span className="text-zinc-400">So are we.</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-normal">
            Planeriac brings together research, engineering and education across disciplines that are rapidly transforming the world.
            Instead of treating AI, robotics, computing, health and education as isolated fields, Planeriac explores the connections between them.
          </p>
        </div>

        {/* Interactive Domain Graph & Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Interactive Visual Network (Left / Center) */}
          <div className="lg:col-span-7 relative h-[380px] sm:h-[460px] bg-[#080a0e] rounded-xl border border-white/10 p-6 flex items-center justify-center overflow-hidden">
            {/* Fine background graph lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Central crosshair */}
              <circle cx="50" cy="50" r="1.5" fill="#38bdf8" opacity="0.8" />
              <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(255,255,255,0.05)" strokeDasharray="1 2" />

              {/* Complete interconnecting web between all 5 pentagon nodes */}
              {PENTAGON_COORDS.map((coord1, idx1) =>
                PENTAGON_COORDS.map((coord2, idx2) => {
                  if (idx1 >= idx2) return null;
                  const isHighlighted =
                    DOMAINS[idx1].id === selectedId || DOMAINS[idx2].id === selectedId;
                  return (
                    <line
                      key={`${idx1}-${idx2}`}
                      x1={coord1.x}
                      y1={coord1.y}
                      x2={coord2.x}
                      y2={coord2.y}
                      stroke={isHighlighted ? 'rgba(56, 189, 248, 0.45)' : 'rgba(255, 255, 255, 0.08)'}
                      strokeWidth={isHighlighted ? '0.75' : '0.4'}
                      strokeDasharray={isHighlighted ? 'none' : '1 2'}
                    />
                  );
                })
              )}
            </svg>

            {/* Interactive Domain Nodes */}
            <div className="absolute inset-0 w-full h-full">
              {DOMAINS.map((domain, index) => {
                const pos = PENTAGON_COORDS[index];
                const isSelected = domain.id === selectedId;
                const isConnected = activeDomain.connections.includes(domain.id) || isSelected;

                return (
                  <button
                    key={domain.id}
                    id={`node-${domain.id}`}
                    onClick={() => setSelectedId(domain.id)}
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group p-2 rounded-lg transition-all duration-300 flex flex-col items-center focus:outline-none ${
                      isSelected ? 'scale-110 z-20' : 'hover:scale-105 z-10'
                    }`}
                  >
                    {/* Node Circle */}
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 border ${
                        isSelected
                          ? 'bg-zinc-900 text-cyan-400 border-cyan-400 ring-4 ring-cyan-500/20 shadow-lg shadow-cyan-950/40'
                          : isConnected
                          ? 'bg-zinc-950/90 text-zinc-300 border-white/20 hover:border-cyan-400/50'
                          : 'bg-zinc-950 text-zinc-600 border-white/5'
                      }`}
                    >
                      {ICONS[domain.id]}
                    </div>

                    {/* Label */}
                    <span
                      className={`mt-2 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                        isSelected ? 'text-cyan-400 font-semibold' : 'text-zinc-400 group-hover:text-white'
                      }`}
                    >
                      {domain.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Center Nexus Emblem */}
            <div className="relative z-0 pointer-events-none text-center">
              <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">PLANERIAC</div>
              <div className="text-xs text-zinc-400 font-medium">CONVERGENCE</div>
            </div>

            {/* Micro instructions */}
            <div className="absolute bottom-3 left-4 font-mono text-[10px] text-zinc-500 flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>CLICK ANY NODE TO INSPECT CROSS-DISCIPLINARY COUPLING</span>
            </div>
          </div>

          {/* Active Domain Detailed Inspector Card (Right) */}
          <div className="lg:col-span-5 bg-zinc-950/80 rounded-xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded bg-white/5 text-cyan-400 border border-white/10">
                    {ICONS[activeDomain.id]}
                  </div>
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                      DOMAIN // 0{DOMAINS.findIndex((d) => d.id === activeDomain.id) + 1}
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-tight">{activeDomain.category}</h3>
                  </div>
                </div>
                <span className="font-mono text-xs text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded">
                  SYNCHRONIZED
                </span>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-zinc-200 mb-2">Scope &amp; Intent:</h4>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">{activeDomain.shortDesc}</p>
                <p className="text-zinc-300 text-sm leading-relaxed">{activeDomain.details}</p>
              </div>

              {/* Interconnected Synapses */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider block mb-3">
                  Coupled Synergies:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeDomain.connections.map((connId) => {
                    const target = DOMAINS.find((d) => d.id === connId);
                    return (
                      <button
                        key={connId}
                        id={`btn-bridge-${connId}`}
                        onClick={() => setSelectedId(connId)}
                        className="inline-flex items-center space-x-1.5 px-3 py-1 rounded bg-zinc-900/90 border border-white/10 hover:border-cyan-400/60 font-mono text-xs text-zinc-300 hover:text-cyan-300 transition-all"
                      >
                        <span>{target?.name}</span>
                        <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500 font-mono">
              <span>SECURITY: DETERMINISTIC</span>
              <span>VERIFICATION: PEER REVIEWED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
